import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Media Release Media Platform',
  },
  footer: {
    tagline: 'Distribution-led newsroom publishing',
  },
  hero: {
    badge: 'Trusted Distribution',
    title: ['Publish news that reaches media, journalists, and partners faster.'],
    description:
      'UpdatePRNews is built for release media teams that need clean publishing flows, clear visibility, and measurable coverage.',
    primaryCta: {
      label: 'Explore latest releases',
      href: '/news-agency',
    },
    secondaryCta: {
      label: 'Latest news',
      href: '/news-agency',
    },
    searchPlaceholder: 'Search release media',
    focusLabel: 'Breaking',
    featureCardBadge: 'media note',
    featureCardTitle: 'New announcements appear instantly on the newsroom feed.',
    featureCardDescription:
      'The homepage highlights top releases, publishing plans, and category-specific coverage in one scan-friendly layout.',
  },
  home: {
    metadata: {
      title: 'Release media distribution and latest business news',
      description:
        'Publish and discover release media with a modern newsroom designed for media distribution.',
      openGraphTitle: 'UpdatePRNews | Media distribution and newsroom',
      openGraphDescription:
        'A clean SaaS-style release media platform with listing, search, distribution tiers, and story pages.',
      keywords: ['release media', 'media distribution', 'latest news', 'public relations', 'newsroom'],
    },
    introBadge: 'Why UpdatePRNews',
    introTitle: 'A distribution-first newsroom for modern PR teams.',
    introParagraphs: [
      'Launch announcements fast using structured publishing templates and editorial controls built for teams.',
      'Improve discoverability with searchable latest news streams, category filters, and dedicated release detail pages.',
      'Track momentum through plan-based analytics and campaign add-ons designed for media outreach.',
    ],
    sideBadge: 'What this product emphasizes',
    sidePoints: [
      'Fast release media publishing workflows.',
      'Category-driven latest news discovery.',
      'Readable article pages with related stories and sharing.',
    ],
    primaryLink: {
      label: 'Open latest news',
      href: '/news-agency',
    },
    secondaryLink: {
      label: 'Latest news',
      href: '/news-agency',
    },
  },
  cta: {
    badge: 'Start Publishing',
    title: 'Choose a plan and distribute your next release media in minutes.',
    description:
      'From startup launches to enterprise campaigns, UpdatePRNews gives your team a single platform to publish and measure outcomes.',
    primaryCta: {
      label: 'Latest news',
      href: '/news-agency',
    },
    secondaryCta: {
      label: 'Latest news',
      href: '/news-agency',
    },
  },
  taskSectionHeading: 'Latest release media',
  taskSectionDescriptionSuffix: 'Read the newest distributed announcements.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest release media',
    description: 'Browse newly published release media and newsroom announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Latest news and release media',
    paragraphs: [
      'This newsroom is optimized for release media discovery with filters, search controls, and fast-scanning article cards.',
      'Use category and date controls to quickly move from broad updates to campaign-specific release coverage.',
    ],
    links: [
      { label: 'Home', href: '/' },
    ],
  },
}
