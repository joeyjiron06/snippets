import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/docs/page'
import { getMDXComponents } from '@/components/mdx'
import { getCanonicalUrl } from '@/lib/site'
import { source } from '@/lib/source'

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <PageLastUpdate date={page.data.updatedDate} className="mb-6 text-sm text-fd-muted-foreground" />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: getCanonicalUrl(page.url),
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: getCanonicalUrl(page.url),
      type: 'article',
    },
    twitter: {
      title: page.data.title,
      description: page.data.description,
    },
  }
}
