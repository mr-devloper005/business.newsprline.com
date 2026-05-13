import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

const plans = [
  {
    name: 'Basic',
    price: '$29',
    description: 'Best for startups launching their first campaign.',
    features: ['Standard distribution level', 'Core media pickup report', 'Up to 2 images per release'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'For growing teams that need stronger reach and analytics.',
    features: ['Expanded distribution level', 'Detailed release analytics', 'Priority review queue'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$249',
    description: 'Advanced visibility and campaign optimization for brands.',
    features: ['Top-tier distribution level', 'Advanced analytics dashboard', 'Extended media reach plus syndication'],
    highlight: false,
  },
]

const comparison = [
  { metric: 'Distribution Level', basic: 'Standard', pro: 'Expanded', premium: 'Top-tier' },
  { metric: 'Analytics Depth', basic: 'Core report', pro: 'Detailed dashboard', premium: 'Advanced insights + exports' },
  { metric: 'Media Reach', basic: 'Local + niche', pro: 'Regional + vertical', premium: 'National + partner network' },
]

const addons = [
  { title: 'Social Amplification', price: '$19', text: 'Boost every release with social snippets and distribution timing support.' },
  { title: 'Editorial Rewrite', price: '$39', text: 'Professional refinement for headlines, structure, and media readability.' },
  { title: 'Premium Placement', price: '$59', text: 'Feature your announcement in high-visibility slots for 48 hours.' },
]

const faqs = [
  { q: 'Can I change plans later?', a: 'Yes. Upgrade or downgrade at any time from your account settings.' },
  { q: 'Do plans include analytics?', a: 'All plans include analytics. Pro and Premium unlock deeper reporting and trend views.' },
  { q: 'Are there annual discounts?', a: 'Yes, annual billing includes discounted rates for all three plans.' },
  { q: 'Do you support agency billing?', a: 'Yes. Contact sales for multi-client workspaces and consolidated billing.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E74646]">Business Wire Pricing</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Choose a release media plan that matches your campaign size</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c3b3b]">
            Three plans built around distribution level, analytics depth, and media reach.
          </p>
          <div className="relative mt-6 h-52 overflow-hidden rounded-2xl sm:h-64">
            <ContentImage
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Release media pricing and analytics dashboard"
              fill
              className="object-cover"
              intrinsicWidth={1400}
              intrinsicHeight={900}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                plan.highlight
                  ? 'border-[#E74646] bg-gradient-to-b from-[#fff2ef] to-white shadow-[0_18px_50px_rgba(231,70,70,0.16)]'
                  : 'border-[#FA9884]/40 bg-white'
              }`}
            >
              {plan.highlight ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-[#E74646] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Popular Plan
                </div>
              ) : null}
              <h2 className="mt-3 text-2xl font-semibold">{plan.name}</h2>
              <p className="mt-1 text-4xl font-semibold text-[#E74646]">{plan.price}</p>
              <p className="mt-2 text-sm leading-7 text-[#6c3b3b]">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-[#5d2f2f]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#E74646]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-6 h-11 w-full rounded-xl text-sm font-semibold ${
                  plan.highlight
                    ? 'bg-[#E74646] text-white hover:bg-[#c73737]'
                    : 'border border-[#E74646] text-[#E74646] hover:bg-[#fff2ef]'
                }`}
              >
                Choose {plan.name}
              </button>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Features comparison</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#FA9884]/35 text-[#7b4a4a]">
                  <th className="py-3 pr-4 font-semibold">Feature</th>
                  <th className="py-3 pr-4 font-semibold">Basic</th>
                  <th className="py-3 pr-4 font-semibold">Pro</th>
                  <th className="py-3 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.metric} className="border-b border-[#FFE5CA]">
                    <td className="py-3 pr-4 font-medium">{row.metric}</td>
                    <td className="py-3 pr-4 text-[#6c3b3b]">{row.basic}</td>
                    <td className="py-3 pr-4 text-[#6c3b3b]">{row.pro}</td>
                    <td className="py-3 text-[#6c3b3b]">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {addons.map((addon) => (
            <article key={addon.title} className="rounded-2xl border border-[#FA9884]/40 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{addon.title}</h3>
                <span className="rounded-full bg-[#FFE5CA] px-3 py-1 text-xs font-semibold text-[#E74646]">{addon.price}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#6c3b3b]">{addon.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-2xl border border-[#FFE5CA] bg-[#FFF3E2]/55 p-4">
                <h3 className="text-base font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6c3b3b]">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
