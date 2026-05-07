import Link from 'next/link'
import { socialLinks } from '@/lib/site'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t px-6 py-6 text-sm text-fd-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year}{' '}
          <a className="underline underline-offset-4" href={socialLinks.website}>
            Joey Jiron
          </a>
          .
        </p>

        <nav className="flex items-center gap-4">
          <a className="underline underline-offset-4" href={socialLinks.github}>
            GitHub
          </a>
          <a className="underline underline-offset-4" href={socialLinks.x}>
            X
          </a>
          <Link className="underline underline-offset-4" href="/">
            Home
          </Link>
        </nav>
      </div>
    </footer>
  )
}
