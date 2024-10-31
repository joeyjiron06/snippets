import tailwindTypography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        neutral: {
          css: {
            '--tw-prose-invert-body': colors.white
          }
        }
      }
    },

    fontFamily: {
      serif: [
        'Garamond',
        // 'Georgia',
        'ui-serif',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      sans: [
        'system-ui',
        'ui-sans-serif',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      current: colors.current,
      transparent: colors.transparent,
      gray: colors.gray,
      red: colors.red,
      black: colors.black,
      blue: colors.blue,
      orange: colors.orange,
      green: colors.green,
      surface: {
        ...colors.neutral,
        950: 'black'
      },
      foreground: colors.neutral,
      brand: colors.zinc,
    },
  },
  plugins: [tailwindTypography],
}
