import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="mt-10 border-t border-[#FA9884]/35 bg-[#2b1414] text-[#FFE5CA]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E74646] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              PR Desk
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{SITE_CONFIG.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#ffd7bd]">
              Distribution-focused newsroom for release media, brand announcements, and latest media updates.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FA9884]">Platform</h4>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/latest-news" className="hover:text-white">Latest News</Link>
              <Link href="/updates" className="hover:text-white">Release Media</Link>
              <Link href="/search" className="hover:text-white">Search</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FA9884]">Company</h4>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/login" className="hover:text-white">Sign In</Link>
              <Link href="/register" className="hover:text-white">Submit Release</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FA9884]">Legal</h4>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#FA9884]/20 pt-5 text-sm text-[#ffd7bd]">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
