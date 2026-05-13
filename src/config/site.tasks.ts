export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Release Media',
    route: '/news-agency',
    description: 'Latest release media and newsroom announcements.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/news-agency',
} as const
