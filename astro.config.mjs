import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { URL } from 'node:url'
import GitHubDarkDefaultTheme from 'tm-themes/themes/github-dark-default.json'


// GitHubDarkDefaultTheme.colors['editor.background'] = 'black'
GitHubDarkDefaultTheme.colors['editor.background'] = '#0a0a0a'

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
  markdown: {
    shikiConfig: {
      // themes:{'my-theme':GitHubDarkDefaultTheme},
      theme: GitHubDarkDefaultTheme
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
