import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { SiteFooter } from '@/components/site-footer'
import { getDocsTree } from '@/lib/docs'
import { docsLayoutOptions } from '@/lib/layout.shared'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsLayout tree={getDocsTree()}  {...docsLayoutOptions()}>
        {children}
      </DocsLayout>
      <SiteFooter />
    </div>
  )
}
