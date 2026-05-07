export const appName = 'Snippets'
export const basePath = '/snippets'
export const siteUrl = 'https://joeyjiron.com/snippets'

export const socialLinks = {
  github: 'https://github.com/joeyjiron06',
  x: 'https://x.com/joeyjiron06',
  website: 'https://joeyjiron.com',
} as const

const categoryLabelMap: Record<string, string> = {
  npm: 'npm',
}

export function getCategoryLabel(slug: string) {
  const normalized = slug.toLowerCase()

  return categoryLabelMap[normalized] ?? normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

export function getCanonicalUrl(pathname: string) {
  return `${siteUrl}${pathname}`
}
