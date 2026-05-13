import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('mediaDistribution', {
    path: '/latest-news',
    title: 'Latest News',
    description: 'Browse the latest release media and media announcements.',
  })

export default async function LatestNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; q?: string; date?: string }>
}) {
  const resolvedSearchParams = (await searchParams) || {}
  return (
    <TaskListPage
      task="mediaDistribution"
      category={resolvedSearchParams.category}
      query={resolvedSearchParams.q}
      dateRange={resolvedSearchParams.date}
    />
  )
}
