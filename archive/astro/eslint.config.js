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
  eslintPluginPrettierConfig ,

  {
    ignores: [
      'dist',
      'node_modules',
      '.github',
      'types.generated.d.ts',
      '.astro',
    ],
  }
]
