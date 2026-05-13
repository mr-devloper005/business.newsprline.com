import Link from 'next/link'
import { BarChart3, CheckCircle2, Megaphone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'

export const HOME_PAGE_OVERRIDE_ENABLED = true
const FREE_STOCK_IMAGES = [
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?auto=compress&cs=tinysrgb&w=1400',
]

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for distribution details and media-ready context.'
  return value.length > 165 ? value.slice(0, 162).trimEnd() + '...' : value
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
  return mediaUrl || image || logo || FREE_STOCK_IMAGES[hash % FREE_STOCK_IMAGES.length]
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 18, { fresh: true })
  const featured = posts[0]
  const recent = posts.slice(1, 7)
  const releaseGrid = posts.slice(4, 10)

  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="space-y-14 pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E74646] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                <Megaphone className="h-4 w-4" />
                Release Media Platform
              </div>
              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Send your news to journalists, publishers, and search audiences instantly.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#6c3b3b]">
                {SITE_CONFIG.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/latest-news"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e74646] px-6 py-3 text-sm font-semibold text-[#e74646] transition hover:bg-[#fff2ef]"
                >
                  Latest News
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['24h', 'Fast publishing turnaround'],
                  ['150+', 'Active media destinations'],
                  ['99.9%', 'Reliable release hosting'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[#FA9884]/40 bg-white/80 p-4">
                    <p className="text-2xl font-semibold text-[#E74646]">{value}</p>
                    <p className="mt-1 text-sm text-[#7b4a4a]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#FA9884]/40 bg-white p-4 shadow-[0_24px_70px_rgba(231,70,70,0.12)]">
              {featured ? (
                <article className="overflow-hidden rounded-[1.4rem]">
                  <div className="relative h-[290px] overflow-hidden rounded-[1.2rem] sm:h-[360px]">
                    <ContentImage
                      src={getPostImage(featured)}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      intrinsicWidth={1400}
                      intrinsicHeight={900}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b0f0fcc] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE5CA]">
                        Featured Release
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{featured.title}</h2>
                    </div>
                  </div>
                  <div className="px-2 py-5">
                    <p className="text-sm leading-7 text-[#5d2f2f]">{excerpt(featured.summary)}</p>
                    <Link
                      href={`/updates/${featured.slug}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E74646] px-4 py-2 text-sm font-semibold text-[#E74646] hover:bg-[#fff2ef]"
                    >
                      Read full release
                    </Link>
                  </div>
                </article>
              ) : (
                <div className="rounded-2xl bg-[#FFF3E2] p-8 text-sm text-[#7b4a4a]">
                  Connect your content source to see featured releases here.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle2, title: 'Distribution-ready format', body: 'SEO-friendly headlines, summaries, and media blocks.' },
              { icon: Sparkles, title: 'Brand-safe publishing', body: 'Consistent newsroom design for every release page.' },
              { icon: BarChart3, title: 'Campaign analytics', body: 'Plan tiers designed around measurable visibility.' },
              { icon: Megaphone, title: 'Media reach tools', body: 'Optional add-ons for social boost and priority push.' },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#FA9884]/35 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <item.icon className="h-5 w-5 text-[#E74646]" />
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6c3b3b]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E74646]">Latest News</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">Read the most recent release media</h2>
            </div>
            <Link href="/latest-news" className="text-sm font-semibold text-[#E74646] hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {releaseGrid.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-[#FA9884]/35 bg-white">
                <div className="relative h-48">
                  <ContentImage
                    src={getPostImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover"
                    intrinsicWidth={1200}
                    intrinsicHeight={800}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E74646]">
                    {String((post.content as any)?.category || 'Release Media')}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#6c3b3b]">{excerpt(post.summary)}</p>
                  <Link href={`/updates/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#E74646] hover:underline">
                    Continue reading
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#E74646] to-[#FA9884] px-6 py-8 text-white sm:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFE5CA]">Distribution Plans</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">Choose Basic, Pro, or Premium and launch your next campaign.</h2>
                <p className="mt-3 text-sm leading-7 text-[#FFF3E2]">
                  Get access to publisher networks, media analytics, and optional outreach add-ons built for scale.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/contact" className="inline-flex rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
