import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E74646]">Contact Us</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Let's plan your next release campaign</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c3b3b]">
            Use this form for distribution inquiries, account support, partnerships, and newsroom assistance.
          </p>
          <div className="relative mt-6 h-52 overflow-hidden rounded-2xl sm:h-64">
            <ContentImage
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Support and contact team"
              fill
              className="object-cover"
              intrinsicWidth={1400}
              intrinsicHeight={900}
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <form className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="h-12 rounded-xl border border-[#FA9884]/45 px-4 text-sm outline-none focus:border-[#E74646]" placeholder="Contact Name *" />
                <input className="h-12 rounded-xl border border-[#FA9884]/45 px-4 text-sm outline-none focus:border-[#E74646]" placeholder="Phone Number" />
              </div>
              <input className="h-12 rounded-xl border border-[#FA9884]/45 px-4 text-sm outline-none focus:border-[#E74646]" placeholder="Email *" />
              <div className="grid gap-4 sm:grid-cols-2">
                <select className="h-12 rounded-xl border border-[#FA9884]/45 px-4 text-sm outline-none focus:border-[#E74646]">
                  <option>What type of organization are you?</option>
                  <option>Agency</option>
                  <option>Startup</option>
                  <option>Enterprise</option>
                </select>
                <select className="h-12 rounded-xl border border-[#FA9884]/45 px-4 text-sm outline-none focus:border-[#E74646]">
                  <option>Subject: how may we help you?</option>
                  <option>Distribution Plan</option>
                  <option>Account Support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <textarea className="min-h-[160px] rounded-2xl border border-[#FA9884]/45 px-4 py-3 text-sm outline-none focus:border-[#E74646]" placeholder="Message / Comment *" />
              <button type="submit" className="h-12 rounded-xl bg-[#E74646] px-6 text-sm font-semibold text-white hover:bg-[#c73737]">
                Submit Now
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
