'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Latest News', href: '/latest-news' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const lowEmphasisLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkClass = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))
      ? 'rounded-full bg-[#E74646] px-4 py-2 text-white'
      : 'rounded-full px-4 py-2 text-[#4f2a2a] hover:bg-[#FFE5CA]'

  return (
    <header className="sticky top-0 z-50 border-b border-[#FA9884]/35 bg-[#FFF3E2]/95 text-[#2f1515] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E74646] text-sm font-bold text-white">
            PR
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">{SITE_CONFIG.name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9b5b5b]">updateprnews.com</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm font-semibold transition ${linkClass(item.href)}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/search" className="grid h-10 w-10 place-items-center rounded-full border border-[#FA9884]/45 bg-white text-[#E74646] hover:bg-[#FFE5CA]">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Link>
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-[#5f2f2f] hover:bg-[#FFE5CA]">
            Sign In
          </Link>
          <Link href="/register" className="rounded-full bg-[#E74646] px-5 py-2 text-sm font-semibold text-white hover:bg-[#c73737]">
            Submit Release
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#FA9884]/45 bg-white text-[#E74646] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#FA9884]/35 bg-[#FFF3E2] px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? 'bg-[#E74646] text-white' : 'bg-white text-[#4f2a2a]'}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/login" className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#4f2a2a]" onClick={() => setOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="rounded-xl bg-[#E74646] px-4 py-3 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
                Submit Release
              </Link>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#8d5353]">
              {lowEmphasisLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full border border-[#FA9884]/35 px-3 py-1" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
