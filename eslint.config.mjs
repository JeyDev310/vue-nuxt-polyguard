// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt([
  {
    ignores: ['components.d.ts', 'nuxt.d.ts', 'server/codegen/*'],
  },
  {
    rules: {
      // overrides over vue3-recommended preset
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'off',
      // overrides defaults
      'no-console': 'off',

      // opinionated vue rules
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
          style: {
            lang: 'scss',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/block-tag-newline': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/enforce-style-attribute': 'error',
      'vue/define-emits-declaration': 'error',
      'vue/define-props-declaration': 'error',
    },
  },
  eslintConfigPrettier,
])
