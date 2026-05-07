import Link from 'next/link'
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch'
import { appName } from '@/lib/site'
import Logo from './logo';

export function SiteHeader() {
  return (
    <header className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-tight">{appName}</span>
        </Link>

        <ThemeSwitch mode="light-dark-system" />
      </div>
    </header>
  )
}
