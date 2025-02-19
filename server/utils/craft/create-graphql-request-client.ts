import { GraphQLClient } from 'graphql-request'
import type { ApiContext } from '#shared/types'

export function createGraphqlRequestClient(context: ApiContext): GraphQLClient {
  if (!context.env) {
    throw new Error('context.env is required')
  }

  if (!('cmsGqlUrl' in context.env)) {
    throw new Error('cmsGqlUrl property in context.env is required')
  }

  if (!context.env.cmsGqlUrl) {
    throw new Error('context.env.cmsGqlUrl cannot be blank')
  }

  const headers: Record<string, string> = {}

  if (context.accessToken) {
    headers.Authorization = `JWT ${context.accessToken}`
  }

  const endpoint = context.env.cmsGqlUrl

  return new GraphQLClient(endpoint, { headers })
}
