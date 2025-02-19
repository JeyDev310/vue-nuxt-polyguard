import { getSdk } from '~~/server/codegen'
import type { ApiContext } from '#shared/types'
import { createGraphqlRequestClient } from './create-graphql-request-client'

export function createGraphqlRequestSdk(context: ApiContext) {
  const graphqlRequestClient = createGraphqlRequestClient(context)

  return getSdk(graphqlRequestClient)
}
