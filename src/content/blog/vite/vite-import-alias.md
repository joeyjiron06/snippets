---
title: 'Vite & Typescript import alias'
description: 'Integrate astro with eslint, prettier and vscode'
publishDate: 'October 31 2024'
updatedDate: 'November 18 2024'
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

Sometimes you may run into problems with eslint. Here's how you can fix them.

If you are using modern eslint with [typescript-eslint](https://typescript-eslint.io/getting-started/), then you should be good and nothing else needed.

If you are using the legacy config for eslint then you must install these dependencies

```bash
npm i -D eslint-plugin-import eslint-import-resolver-typescript
```

Then update your eslint config to add these settings so that eslint knows to use Typescirpt's config for imports (which will include your new alias).

```json
{
  "extends": [
    "plugin:import/typescript",
  ],
  "settings": {
    "import/resolver": {
      "typescript": true,
      "node": true
    }
  }
}
```