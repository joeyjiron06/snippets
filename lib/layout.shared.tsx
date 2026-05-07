import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { appName } from '@/lib/site'
import Logo from '@/components/logo'

export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <div className='flex gap-2 items-center'><Logo className='size-4' /> <span>{appName}</span></div> ,
      url: '/',
    },
    themeSwitch: {
      enabled: true,
      mode: 'light-dark-system',
    },
    searchToggle: {
      enabled: true,
    },
  }
}
