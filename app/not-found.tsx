import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-fd-muted-foreground">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="max-w-2xl text-fd-muted-foreground">
          The page you were looking for does not exist in the new docs site.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/" className="rounded-full border px-4 py-2 text-sm font-medium">
            Go home
          </Link>
          <Link href="/browse" className="rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground">
            Browse snippets
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
