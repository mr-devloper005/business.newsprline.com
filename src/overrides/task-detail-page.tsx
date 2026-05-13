import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Link as LinkIcon, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true
const FREE_STOCK_IMAGES = [
  'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/6347901/pexels-photo-6347901.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/8112106/pexels-photo-8112106.jpeg?auto=compress&cs=tinysrgb&w=1400',
]

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

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const recent = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 5)
  const related = (await fetchTaskPosts('mediaDistribution', 12, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post.summary ||
    'Release media update from the UpdatePRNews editorial team.'
  const releaseUrl = `/updates/${post.slug}`
  const encodedUrl = encodeURIComponent(`https://updateprnews.com${releaseUrl}`)
  const encodedTitle = encodeURIComponent(post.title)

  return (
    <div className="min-h-screen text-[#2f1515]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E74646]">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/latest-news">Latest News</Link>
            <span>›</span>
            <span className="truncate">{String((content.category as string) || 'Release Media')}</span>
          </div>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#6c3b3b]">{subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#7b4a4a]">
            <span className="rounded-full bg-[#FFE5CA] px-3 py-1">
              By {post.authorName || 'Editorial Desk'}
            </span>
            <span className="rounded-full bg-[#FFE5CA] px-3 py-1">
              {String((content.category as string) || 'Release Media')}
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
          <article className="rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
            <div className="relative mb-7 h-[280px] overflow-hidden rounded-2xl sm:h-[420px]">
              <ContentImage
                src={getPostImage(post)}
                alt={post.title}
                fill
                className="object-cover"
                intrinsicWidth={1400}
                intrinsicHeight={900}
              />
            </div>
            <div className="article-content prose prose-lg max-w-none prose-headings:text-[#311313] prose-a:text-[#E74646]">
              <RichContent html={html} />
            </div>
          </article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#FA9884]/40 bg-white p-5">
              <h3 className="text-lg font-semibold">Share release</h3>
              <div className="mt-3 grid gap-2">
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#FA9884]/45 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFF3E2]"
                >
                  <Twitter className="h-4 w-4 text-[#E74646]" />
                  Share on X
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#FA9884]/45 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFF3E2]"
                >
                  <Facebook className="h-4 w-4 text-[#E74646]" />
                  Share on Facebook
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#FA9884]/45 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFF3E2]"
                >
                  <Linkedin className="h-4 w-4 text-[#E74646]" />
                  Share on LinkedIn
                </Link>
                <Link href={releaseUrl} className="inline-flex items-center gap-2 rounded-xl border border-[#FA9884]/45 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFF3E2]">
                  <LinkIcon className="h-4 w-4 text-[#E74646]" />
                  Copy page URL
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-[#FA9884]/40 bg-white p-5">
              <h3 className="text-lg font-semibold">Recent releases</h3>
              <div className="mt-3 grid gap-3">
                {recent.map((item) => (
                  <Link key={item.id} href={`/updates/${item.slug}`} className="rounded-xl border border-[#FFE5CA] bg-[#FFF3E2]/55 px-3 py-2 text-sm text-[#5d2f2f] hover:bg-[#FFE5CA]/60">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-[#FA9884]/40 bg-white p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Related articles</h2>
            <Link href="/latest-news" className="text-sm font-semibold text-[#E74646] hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-[#FA9884]/35 bg-white">
                <div className="relative h-40">
                  <ContentImage
                    src={getPostImage(item)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    intrinsicWidth={1200}
                    intrinsicHeight={800}
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#6c3b3b]">
                    {item.summary || 'Read full details in this related release.'}
                  </p>
                  <Link href={`/updates/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-[#E74646] hover:underline">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
