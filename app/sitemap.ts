import type { MetadataRoute } from 'next'
import { source } from '@/lib/source'
import { getCanonicalUrl, siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: getCanonicalUrl(page.url),
    lastModified: page.data.updatedDate,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/browse`,
      lastModified: new Date(),
    },
    ...pages,
  ]
}
