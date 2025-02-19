import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getProductCategory(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetProductCategory({ uri })
    if (!response) {
      return null
    }

    // check if the response is one of the expected entry types defined in the pages section
    if (
      response?.entry?.__typename !== 'productCategoriesCatalogPage_Entry' &&
      response?.entry?.__typename !== 'productCategoriesCatalogListing_Entry'
    ) {
      return null
    }

    return response?.entry
  } catch (error) {
    logError(getProductCategory.name, error)
    throw error
  }
}
