import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getResourceCategories(context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetResourceCategories()
    return (response?.resourceCategoriesEntries || [])
      .filter((rc) => rc !== null && rc !== undefined)
      .filter((rc) => rc.__typename === 'resourcesCategoriesDefault_Entry')
  } catch (error) {
    logError(getResourceCategories.name, error)
    throw error
  }
}
