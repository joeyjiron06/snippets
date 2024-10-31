---
title: 'Deploy Astro to GitHub Pages'
description: 'Deploy an Astro project to github pages'
publishDate: 'October 31 2024'
category: 'astro'
tags:
  - astro
  - github
  - github pages
  - html
---

Let's get straight to it. Here's how to deploy an Astro project with GitHub pages.

Update `astro.config.mjs`

```js
export default defineConfig({
  base: 'https://github.com/YOUR_USERNAME_HERE',
  site: '/NAME_OF_YOUR_REPO_HERE',
})
```

Update your html layout to include this

```jsx
<html>
  <head>
  <!--This sets all relative urls to be Astro's site value. You need the trailing slash for this to work-->

    {import.meta.env.BASE_URL ? (
      <base href={import.meta.env.BASE_URL + '/'} />
    ) : null}
  </head>

  <body>
    <a href="blog">blog</a>
  </body>
</html>
```

Create `.github/workflows/astro.yml`

```yaml
name: Deploy to GitHub Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['main']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: 'pages'
  cancel-in-progress: false

env:
  BUILD_PATH: '.' # default value when not using subfolders
  # BUILD_PATH: subfolder

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 7
          run_install: false
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
      - name: Install dependencies
        run: pnpm install
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Build with Astro
        run: |
          pnpm run build \
            --site "${{ steps.pages.outputs.origin }}" \
            --base "${{ steps.pages.outputs.base_path }}"
        working-directory: ${{ env.BUILD_PATH }}
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ env.BUILD_PATH }}/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Enable Github Pages deployment from GitHub actions by going here `https://github.com/YOUR_USERNAME/REPO_NAME/settings/pages`

![GitHub Actions Settings](~/assets/images/github-pages-settings.png)

Push your changes and watch your code deploy!
