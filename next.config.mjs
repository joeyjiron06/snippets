import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/snippets',
  assetPrefix: '/snippets',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    // Reapply the existing rule, but only for svg imports ending in ?url
    fileLoaderRule.resourceQuery = /url/;  // *.svg?url

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.push(

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /react/, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )


    return config
  }
}

export default withMDX(config)
