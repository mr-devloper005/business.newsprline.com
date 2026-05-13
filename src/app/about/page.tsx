import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'

const values = [
  {
    title: 'Media-first workflow',
    description: 'Every release is structured for readability, indexing, and journalist-friendly handoff.',
  },
  {
    title: 'Campaign visibility',
    description: 'Publishing, distribution, and analytics live in one connected workflow for PR teams.',
  },
  {
    title: 'Reliable delivery',
    description: 'From quick updates to major launches, your message is delivered on a dependable stack.',
  },
]

const milestones = [
  { year: '2022', title: 'Platform foundation', text: 'Launched as a lightweight newsroom for modern digital PR teams.' },
  { year: '2024', title: 'Distribution expansion', text: 'Added tiered reach options and deeper release performance analytics.' },
  { year: '2026', title: 'Campaign-ready suite', text: 'Unified plans, latest-news discovery, and release publishing into one product.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E74646]">About Us</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {SITE_CONFIG.name} is built for teams that publish news with purpose
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c3b3b]">
            We focus on clean release publishing, strong media distribution, and practical analytics so every announcement creates measurable impact.
          </p>
          <div className="relative mt-6 h-52 overflow-hidden rounded-2xl sm:h-64">
            <ContentImage
              src="https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="UpdatePRNews team collaboration"
              fill
              className="object-cover"
              intrinsicWidth={1400}
              intrinsicHeight={900}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full border border-[#E74646] px-5 py-2.5 text-sm font-semibold text-[#E74646] hover:bg-[#fff2ef]">
              Contact Team
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-[#FA9884]/40 bg-white p-5">
              <h2 className="text-xl font-semibold">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#6c3b3b]">{value.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Our growth timeline</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {milestones.map((item) => (
              <article key={item.year} className="rounded-2xl border border-[#FFE5CA] bg-[#FFF3E2]/55 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E74646]">{item.year}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6c3b3b]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
