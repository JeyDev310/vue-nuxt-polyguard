import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getBreadcrumbs(uri: string, context: ApiContext = {}) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetBreadcrumbs({
      uri,
    })

    return response?.entry
  } catch (error) {
    logError(getBreadcrumbs.name, error)
    throw error
  }
}
