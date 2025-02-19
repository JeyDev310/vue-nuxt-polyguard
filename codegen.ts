import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NUXT_PUBLIC_ENV_CMS_GQL_URL,
  documents: 'server/integrations/craftcms/**/*.gql',
  emitLegacyCommonJSImports: false,
  generates: {
    'server/codegen/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        // skipTypename: true,
        // nonOptionalTypename: true
        useTypeImports: true,
      },
    },
    'server/codegen/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
