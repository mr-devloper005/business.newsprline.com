import Link from 'next/link'
import { CalendarDays, Filter, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { ContentImage } from '@/components/shared/content-image'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true
const FREE_STOCK_IMAGES = [
  'https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/7681097/pexels-photo-7681097.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/8112164/pexels-photo-8112164.jpeg?auto=compress&cs=tinysrgb&w=1400',
]

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the release to read the full media announcement.'
  return value.length > 170 ? value.slice(0, 167).trimEnd() + '...' : value
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

function inDateRange(value?: string, range?: string) {
  if (!range || range === 'all' || !value) return true
  const date = new Date(value).getTime()
  if (!Number.isFinite(date)) return true
  const now = Date.now()
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 3650
  return now - date <= days * 24 * 60 * 60 * 1000
}

export async function TaskListPageOverride({
  category,
  query,
  dateRange,
}: {
  task: TaskKey
  category?: string
  query?: string
  dateRange?: string
}) {
  const posts = await fetchTaskPosts('mediaDistribution', 40, { fresh: true })
  const normalizedQuery = (query || '').trim().toLowerCase()
  const normalizedCategory = (category || 'all').trim().toLowerCase()
  const normalizedDateRange = (dateRange || 'all').trim().toLowerCase()
  const filtered = posts.filter((post) => {
    const postCategory = String((post.content as any)?.category || 'general').toLowerCase()
    if (normalizedCategory !== 'all' && postCategory !== normalizedCategory) return false
    if (!inDateRange(post.publishedAt, normalizedDateRange)) return false
    if (!normalizedQuery) return true
    const haystack = `${post.title} ${post.summary || ''} ${postCategory}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
  const recent = posts.slice(0, 5)
  const categoryOptions = Array.from(
    new Set(posts.map((item) => String((item.content as any)?.category || 'General')))
  )
  const activeCount = filtered.length

  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E74646]">Latest News</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Release media listing and discovery</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6c3b3b]">
            Browse announcements with category and date filters, then open each release page for complete details.
          </p>
          <form action="/latest-news" className="mt-6 grid gap-3 rounded-2xl border border-[#FFE5CA] bg-[#FFF3E2]/55 p-4 lg:grid-cols-[1fr_220px_220px_auto]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E74646]" />
              <input
                name="q"
                defaultValue={query || ''}
                placeholder="Search releases by title or keyword"
                className="h-11 w-full rounded-xl border border-[#FA9884]/45 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#E74646]"
              />
            </label>
            <label className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E74646]" />
              <select
                name="category"
                defaultValue={normalizedCategory}
                className="h-11 w-full rounded-xl border border-[#FA9884]/45 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#E74646]"
              >
                <option value="all">All categories</option>
                {categoryOptions.map((item) => (
                  <option key={item} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#E74646]" />
              <select
                name="date"
                defaultValue={normalizedDateRange}
                className="h-11 w-full rounded-xl border border-[#FA9884]/45 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#E74646]"
              >
                <option value="all">Any date</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </label>
            <button type="submit" className="h-11 rounded-xl bg-[#E74646] px-5 text-sm font-semibold text-white hover:bg-[#c73737]">
              Apply
            </button>
          </form>
          <p className="mt-3 text-sm text-[#7b4a4a]">{activeCount} result{activeCount === 1 ? '' : 's'} found.</p>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-[#FA9884]/35 bg-white transition hover:-translate-y-1 hover:shadow-lg">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E74646]">
                    {String((post.content as any)?.category || 'Release Media')}
                  </p>
                  <h2 className="mt-2 line-clamp-2 text-2xl font-semibold leading-snug">{post.title}</h2>
                  <p className="mt-2 text-sm text-[#7b4a4a]">
                    {post.authorName || 'Editorial Desk'}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#6c3b3b]">{excerpt(post.summary)}</p>
                  <Link href={`/updates/${post.slug}`} className="mt-4 inline-flex rounded-full border border-[#E74646] px-4 py-2 text-sm font-semibold text-[#E74646] hover:bg-[#fff2ef]">
                    Read release
                  </Link>
                </div>
              </article>
            ))}
            {!filtered.length ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#FA9884]/70 bg-white p-10 text-center text-sm text-[#7b4a4a]">
                No matching release found. Try a different query or date range.
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#FA9884]/35 bg-white p-5">
              <h3 className="text-lg font-semibold">Quick search</h3>
              <form action="/search" className="mt-3 flex gap-2">
                <input
                  name="q"
                  defaultValue={query || ''}
                  placeholder="Search the full site"
                  className="h-11 flex-1 rounded-xl border border-[#FA9884]/45 px-3 text-sm outline-none focus:border-[#E74646]"
                />
                <button type="submit" className="h-11 rounded-xl bg-[#E74646] px-4 text-sm font-semibold text-white hover:bg-[#c73737]">
                  Go
                </button>
              </form>
            </div>
            <div className="rounded-2xl border border-[#FA9884]/35 bg-white p-5">
              <h3 className="text-lg font-semibold">Recent releases</h3>
              <div className="mt-3 grid gap-3">
                {recent.map((post) => (
                  <Link key={post.id} href={`/updates/${post.slug}`} className="rounded-xl border border-[#FFE5CA] bg-[#FFF3E2]/50 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFE5CA]/65">
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
