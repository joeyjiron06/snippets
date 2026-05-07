import type { Metadata } from 'next'
import { DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { getCanonicalUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Browse',
  description: 'Browse the snippets docs shell and use search or the sidebar to find a page.',
  alternates: {
    canonical: getCanonicalUrl('/browse'),
  },
}

export default function BrowsePage() {
  return (
    <DocsPage breadcrumb={{ enabled: false }} footer={{ enabled: false }} tableOfContent={{ enabled: false }}>
      <DocsTitle>Browse snippets</DocsTitle>
      <DocsDescription>
        Use search or the sidebar to jump into the snippet you need.
      </DocsDescription>
    </DocsPage>
  )
}
