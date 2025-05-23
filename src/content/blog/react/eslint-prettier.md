---
title: 'React + Eslint + Prettier + VSCode'
description: 'Integrate react router with eslint, prettier and vscode'
publishDate: 'May 23 2025'
category: 'react'
tags:
  - react-router
  - eslint
  - prettier
  - vscode
  - html
---

Why is integrating ESLint, Prettier, and VSCode so hard?! These are all the steps you need, hopefully this saves you hours of effort.

The strategy here is to use ESLint as a linting tool to catch bugs, and Prettier for formatting the code properly. This is the recommend setup from Prettier.

Install eslint and fill out the questions in the script for your project

```bash
pnpm create @eslint/config@latest
```

Install npm dependencies

```bash
pnpm i -D eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks prettier typescript-eslint prettier-plugin-organize-imports
```

(Optional)

```bash
# adds tailwind rearrange support
pnpm i -D prettier-plugin-tailwindcss
```

Install VSCode dependencies

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

VSCode settings.json

Open user settings with command pallette <kbd>CMD</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and search for "user settings" and select `Preferences: Open User Settings (JSON)`

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "eslint.codeActionsOnSave.rules": ["format"],
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
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
  ],
}
```

Create `eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import eslintPluginPrettierConfig from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ...jsxA11y.flatConfigs['strict'],
    files: ['**/*.tsx'],
  },
  reactHooksPlugin.configs['recommended-latest'],

  // Adds prettier rules to eslint so we will get eslint errors if
  // formatting is off. if these rules conflict with something else
  // you should use eslint-config-prettier instead to disable allPre
  // rules that might conflict with prettier
  eslintPluginPrettierConfig,
])
```

Create `.prettierrc.mjs`

```js
/** @type {import("prettier").Config} */
export default {
  plugins: [
    'prettier-plugin-organize-imports',
    // if using tailwind 👇
    // 'prettier-plugin-tailwindcss'
  ],
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  useTabs: false,
  semi: true,
}
```
