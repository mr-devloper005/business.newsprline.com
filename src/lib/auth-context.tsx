'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'
import { currentUser } from '@/data/mock-data'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  type StoredAccount = {
    id: string
    name: string
    email: string
    password: string
    user: User
  }
  const accountsStorageKey = `${storageKeys.user}-accounts`

  useEffect(() => {
    const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const buildUser = useCallback((overrides: Partial<User>) => {
    const joinedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    return {
      ...currentUser,
      id: `user-${Date.now()}`,
      joinedDate,
      followers: 0,
      following: 0,
      isVerified: false,
      ...overrides,
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const safeEmail = email.trim().toLowerCase()
    if (!safeEmail || !password) {
      setIsLoading(false)
      throw new Error('Email and password are required.')
    }

    const accounts = loadFromStorage<StoredAccount[]>(accountsStorageKey, [])
    const account = accounts.find((item) => item.email.toLowerCase() === safeEmail)

    if (!account) {
      const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
      if (storedUser?.email?.toLowerCase() === safeEmail) {
        setUser(storedUser)
        saveToStorage(storageKeys.user, storedUser)
        setIsLoading(false)
        return
      }
    }

    if (!account || account.password !== password) {
      setIsLoading(false)
      throw new Error('Invalid email or password.')
    }

    setUser(account.user)
    saveToStorage(storageKeys.user, account.user)
    setIsLoading(false)
  }, [accountsStorageKey])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeys.user)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const safeName = name.trim()
    const safeEmail = email.trim().toLowerCase()
    if (!safeName || !safeEmail || !password) {
      setIsLoading(false)
      throw new Error('Name, email, and password are required.')
    }

    const accounts = loadFromStorage<StoredAccount[]>(accountsStorageKey, [])
    if (accounts.some((item) => item.email.toLowerCase() === safeEmail)) {
      setIsLoading(false)
      throw new Error('An account with this email already exists.')
    }

    const nextUser = buildUser({
      name: safeName,
      email: safeEmail,
    })
    const nextAccount: StoredAccount = {
      id: nextUser.id,
      name: safeName,
      email: safeEmail,
      password,
      user: nextUser,
    }
    saveToStorage(accountsStorageKey, [...accounts, nextAccount])
    setUser(nextUser)
    saveToStorage(storageKeys.user, nextUser)
    setIsLoading(false)
  }, [accountsStorageKey, buildUser])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      saveToStorage(storageKeys.user, nextUser)
      return nextUser
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
