import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?auto=compress&cs=tinysrgb&w=1400',
]

function excerpt(text?: string | null, max = 160) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for distribution details and media-ready context.'
  return value.length > max ? `${value.slice(0, max - 3).trimEnd()}...` : value
}

function getPostImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content : {}
  const logo = typeof (content as any).logo === 'string' ? (content as any).logo : null
  const images = Array.isArray((content as any).images) ? (content as any).images : []
  const image = images.find((item: unknown) => typeof item === 'string' && item)
  const hashSource = String(post?.id || post?.slug || post?.title || '0')
  const hash = hashSource.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return mediaUrl || image || logo || FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length]
}

function splitColumns<T>(items: T[], columns = 4): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => [])
  items.forEach((item, idx) => {
    result[idx % columns].push(item)
  })
  return result
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 28, { fresh: true })
  const brandName = SITE_CONFIG.name
  const domainName = SITE_CONFIG.domain

  const resourcesCategories = (process.env.NEXT_PUBLIC_HOME_RESOURCES_CATEGORY || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
  const resourcesFiltered = resourcesCategories.length
    ? posts.filter((post) => {
        const category = String((post.content as any)?.category || '')
          .trim()
          .toLowerCase()
        return category && resourcesCategories.includes(category)
      })
    : posts
  const resources = resourcesFiltered.slice(0, 3)
  const serviceA = posts[4]
  const serviceB = posts[5]
  const latest = posts.slice(6, 26)
  const latestColumns = splitColumns(latest, 4)
  const resourcesViewMoreHref = resourcesCategories.length
    ? `/latest-news?category=${encodeURIComponent(resourcesCategories[0])}`
    : '/latest-news'

  return (
    <div className="min-h-screen bg-[#dfe3ea] text-[#16253d]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-r from-[#2f83d3] to-[#12c6b4] text-white">
          <div className="absolute -bottom-[280px] left-[-220px] h-[520px] w-[140%] rounded-[50%] bg-[#dfe3ea]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
                Simplify Press Release Distribution
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-white/95">
                Distribute the right message to the right audience at the right time with {brandName} on {domainName}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="rounded-xl bg-[#13c8b1] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0db7a2]">
                  Submit a Press Release
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-8 text-white/90">
                <span className="text-xl font-semibold">Leader Rating</span>
                <span className="text-xl font-semibold">Trust Network</span>
                <span className="text-xl font-semibold">Editorial Reach</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/95 p-5 text-[#102037] shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
              <p className="rounded-2xl bg-[#db68a4] p-5 text-4xl font-semibold leading-tight text-white">
                Get your story seen in the right places!
              </p>
              <p className="mt-6 text-3xl font-semibold">Monthly Reach: Billions!</p>
              <p className="mt-3 text-base text-[#3e4f66]">
                Built for {domainName}, this platform amplifies your announcements across trusted media channels.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-center text-5xl font-semibold tracking-[-0.03em] text-[#2d68cc]">Trusted by thousands</h2>
          <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
            {[
              '#1 in customer satisfaction since 2018',
              'Best in class science, process and technology',
              'Simple, targeted and cost-effective',
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 rounded-lg bg-[#f2f5fa] p-3 text-[#2d57a9]">
                <CheckCircle2 className="h-5 w-5 text-[#13c8b1]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#13c8b1] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#dfe3ea] p-8 text-center">
            <h3 className="text-5xl font-semibold">Press release distribution and multimedia software and services</h3>
            <p className="mt-6 text-2xl text-[#b119df]">Greater brand awareness, increased traffic and stronger media visibility.</p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#13c8b1] px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute -bottom-[240px] left-[-260px] h-[450px] w-[150%] rounded-[50%] bg-[#dfe3ea]" />
          <div className="relative mx-auto max-w-7xl">
            <h3 className="text-center text-5xl font-semibold text-white">Press Release Optimizer</h3>
            <p className="mx-auto mt-4 max-w-3xl text-center text-2xl text-[#1a4f73]">All our products and services under one subscription</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'CONTENT PRO',
                  description: 'Consistently fuel your content calendar with optimized press releases, blogs, and newsroom updates.',
                  features: ['Press Release Calendar', 'Press Release Writing', 'SEO Optimization', 'Online Media Room'],
                },
                {
                  title: 'MEDIA PRO',
                  description: 'Bridge the gap between your content team and the right journalists, publishers, and influencers.',
                  features: ['Custom Media Targeting', 'Media Pitching', 'Media Monitoring', 'Media Databases'],
                },
                {
                  title: 'TOTAL PRO',
                  description: 'Outsource distribution workflows and maximize return on investment with end-to-end support.',
                  features: ['Content PRO + Media PRO', 'Priority Distribution', 'Performance Insights'],
                },
              ].map((plan) => (
                <article key={plan.title} className="rounded-2xl bg-white/90 p-6 text-[#0f2740] shadow-xl">
                  <h4 className="text-4xl font-semibold text-[#13bca8]">{plan.title}</h4>
                  <p className="mt-3 text-lg leading-relaxed">{plan.description}</p>
                  <p className="mt-6 text-xl font-semibold text-[#2d68cc]">Schedule a Demo</p>
                  <Link href="/contact" className="mt-4 inline-flex w-full items-center justify-between rounded-lg bg-[#2d68cc] px-4 py-2 text-base font-semibold text-white hover:bg-[#2558ad]">
                    Learn More <span className="text-2xl">+</span>
                  </Link>
                  <ul className="mt-6 space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#13c8b1]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#d7dde5] p-10 text-center">
            <h3 className="text-5xl font-semibold">Learn more about {brandName}</h3>
            <p className="mx-auto mt-4 max-w-3xl text-2xl text-[#3b5877]">
              Leverage press release distribution and media technology on {domainName} as a marketing channel to drive sales.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-lg text-[#2c4f74]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#13c8b1]" />Boost SEO rankings</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#13c8b1]" />Increase sales opportunities</span>
            </div>
            <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-[#13c8b1] px-6 py-3 text-lg font-semibold text-white hover:bg-[#0fb39f]">
              Free PR Guide
            </Link>
          </div>
        </section>

        {serviceA ? (
          <section className="bg-[#2d57a9] px-4 py-16 text-white sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
              <div className="relative h-[380px] overflow-hidden rounded-3xl">
                <ContentImage src={getPostImage(serviceA)} alt={serviceA.title} fill className="object-cover" intrinsicWidth={1200} intrinsicHeight={900} />
              </div>
              <div>
                <h3 className="text-5xl font-semibold">Press Release Services for PR agencies</h3>
                <p className="mt-4 text-2xl leading-relaxed text-white/95">
                  Manage all client PR activities in a single tool and create unlimited online newsrooms for collaboration.
                </p>
                <ul className="mt-6 space-y-3 text-xl">
                  <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#a7f2dc]" />More accurate contact information</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#a7f2dc]" />No contract required</li>
                </ul>
                <Link href={`/updates/${serviceA.slug}`} className="mt-7 inline-flex rounded-xl bg-[#13c8b1] px-6 py-3 text-xl font-semibold text-white hover:bg-[#0fb39f]">
                  Do more with {brandName}
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {serviceB ? (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h3 className="text-center text-5xl font-semibold">Flexible Press Release Services to fit your needs</h3>
            <p className="mt-3 text-center text-2xl text-[#3a5872]">{brandName} offers software and services to help meet any goals or budget.</p>
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-5xl font-semibold leading-tight">Press Release Services & Software for in-house PR teams</h4>
                <p className="mt-5 text-2xl leading-relaxed text-[#3b5877]">
                  Maintain all company announcements in one place so they are accessible to the media and easy to manage.
                </p>
                <ul className="mt-6 space-y-3 text-xl text-[#2c4f74]">
                  <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#13c8b1]" />Build and save media lists</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#13c8b1]" />Pitch journalists directly through the platform</li>
                </ul>
                <Link href={`/updates/${serviceB.slug}`} className="mt-7 inline-flex rounded-xl bg-[#13c8b1] px-6 py-3 text-xl font-semibold text-white hover:bg-[#0fb39f]">
                  Do more with {brandName}
                </Link>
              </div>
              <div className="relative h-[420px] overflow-hidden rounded-3xl">
                <ContentImage src={getPostImage(serviceB)} alt={serviceB.title} fill className="object-cover" intrinsicWidth={1200} intrinsicHeight={900} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h3 className="text-5xl font-semibold">Testimonials</h3>
          <p className="mt-4 text-4xl text-[#1c2f4a]">#1 for customer satisfaction. Just ask our clients.</p>
          <p className="mx-auto mt-8 max-w-5xl text-5xl italic leading-snug text-[#243a59]">
            "The {brandName} team provides a wide range of expertise on copywriting and best practices, resulting in higher pickups and stronger return on investment."
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-[#13c8b1] px-6 py-3 text-xl font-semibold text-white hover:bg-[#0fb39f]">
            Do more with {brandName}
          </Link>
        </section>

        {resources.length ? (
          <section className="bg-[#2d57a9] px-4 py-16 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <h3 className="text-5xl font-semibold">{brandName} educational resources</h3>
              <p className="mt-3 text-2xl text-white/90">Explore our expert advice, how-tos and guides</p>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {resources.map((post) => (
                  <article key={`case-${post.id}`} className="overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                    <div className="relative h-56">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" intrinsicWidth={1200} intrinsicHeight={800} />
                      <div className="absolute inset-0 bg-[#2d57a9]/55" />
                      <div className="absolute inset-0 grid place-items-center p-4 text-center">
                        <div>
                          <p className="text-sm uppercase tracking-[0.12em] text-white/90">Case Study</p>
                          <p className="mt-1 text-4xl font-semibold text-white">{excerpt(post.title, 50)}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <Link href={resourcesViewMoreHref} className="mt-8 inline-flex rounded-xl bg-[#13c8b1] px-6 py-3 text-lg font-semibold text-white hover:bg-[#0fb39f]">
                View More
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h3 className="text-center text-5xl font-semibold tracking-[-0.03em]">Latest {brandName} press releases</h3>
          <div className="mt-10 grid gap-8 lg:grid-cols-4">
            {latestColumns.map((column, colIdx) => (
              <div key={`col-${colIdx}`} className="space-y-8">
                {column.map((post, idx) => (
                  <article key={post.id} className="border-b border-[#cbd3df] pb-6">
                    {idx % 2 === 0 ? (
                      <div className="relative mb-4 h-56 overflow-hidden rounded-2xl">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" intrinsicWidth={1200} intrinsicHeight={800} />
                      </div>
                    ) : null}
                    <h4 className="text-4xl font-semibold leading-tight text-[#2e3240]">{post.title}</h4>
                    <p className="mt-3 text-lg leading-relaxed text-[#4a607d]">{excerpt(post.summary, 120)}</p>
                    <Link href={`/updates/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-2xl font-semibold text-[#2d68cc] hover:underline">
                      Read PR
                    </Link>
                  </article>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/latest-news" className="text-4xl font-semibold text-[#2d68cc] hover:underline">
              View all press releases
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
