---
title: 'Vite & Typescript import alias'
description: 'Integrate astro with eslint, prettier and vscode'
publishDate: 'October 31 2024'
category: 'vite'
tags:
  - vite
  - typescript
  - import alias
---

Go from this

```js
import component from '../../../../../components/my-component'
```

to this

```js
import component from '~/components/my-component'
```

I personally like using Remix's convention of adding `~/` for the "home" of your src folder, but you can use any convention you'd like. You need to update typescript so that it knows how to resolve your alias as well as Vite so that it knows how to do the imports properly.

Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

If using vite directly in your project: Update `vite.config.ts`

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // add this resolve config
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).toString(),
    },
  },
})
```

If you are using astro: Update `astro.config.mjs`

```js
// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '~': new URL('./src', import.meta.url).toString(),
      },
    },
  },
})
```
