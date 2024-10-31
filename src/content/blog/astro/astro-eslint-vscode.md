---
title: 'Astro + Eslint + Prettier + VSCode'
description: 'Integrate astro with eslint, prettier and vscode'
publishDate: 'October 31 2024'
category: 'astro'
tags:
  - astro
  - eslint
  - prettier
  - vscode
  - html
---

Why is integrating ESLint, Prettier, and VSCode so hard?! And adding even more complexity is to get this all working with Astro. These are all the steps you need, hopefully this saves you hours of effort.

The strategy here is to use ESLint as a linting tool to catch bugs, and Prettier for formatting the code properly. This is the recommend setup from Prettier.

Install npm dependencies

```bash
pnpm i -D @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-astro eslint-plugin-jsx-a11y eslint-plugin-prettier prettier prettier-plugin-astro prettier-plugin-tailwindcss typescript-eslint
```

Install VSCode dependencies

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)

VSCode settings.json

Open user settings with command pallette <kbd>CMD</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and search for "user settings" and select `Preferences: Open User Settings (JSON)`

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "eslint.codeActionsOnSave.rules": ["format"],

  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro",
    "typescript",
    "typescriptreact",
  ],
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "markdown",
    "astro",
  ],
}
```

Create `eslint.config.js`

```js
import eslintPluginAstro from 'eslint-plugin-astro'
import js from '@eslint/js'
import eslintPluginPrettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  // javascript linting
  js.configs.recommended,

  // typescript linting
  ...tseslint.configs.recommended,

  // linting for astro
  ...eslintPluginAstro.configs.recommended,

  // accessibility linting
  ...eslintPluginAstro.configs['jsx-a11y-strict'],

  // Adds prettier rules to eslint so we will get eslint errors if
  // formatting is off. if these rules conflict with something else
  // you should use eslint-config-prettier instead to disable all
  // rules that might conflict with prettier
  eslintPluginPrettierConfig,

  {
    ignores: [
      'dist',
      'node_modules',
      '.github',
      'types.generated.d.ts',
      '.astro',
    ],
  },
]
```

Create `.prettierrc.mjs`

```js
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  useTabs: false,
  semi: false,
  overrides: [
    {
      files: ['*.astro'],
      options: {
        parser: 'astro',
      },
    },
  ],
}
```
