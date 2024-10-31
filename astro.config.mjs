import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { URL } from 'node:url'


// https://astro.build/config
export default defineConfig({
  site: 'https://github.com/joeyjiron06',
  base: '/snippets',
  vite: {
    resolve: {
      alias: {
        '~': new URL('./src', import.meta.url).toString(),
      },
    },
  },
  integrations: [
    icon(),
    tailwind({
      nesting: true,
      applyBaseStyles: false,
    }),
  ],
})
