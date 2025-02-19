import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

interface SearchProductsParams {
  searchText?: string
  productCategoriesIds?: Array<number>
  productDivisionsIds?: Array<number>
}
export async function performProductSearch(
  searchTerm: SearchProductsParams,
  context: ApiContext,
) {
  try {
    const sdk = createGraphqlRequestSdk(context)

    const response = await sdk.ProductSearch(searchTerm)

    return {
      productCount: response?.productCount ?? 0,
      products: response?.products ?? [],
    }
  } catch (error) {
    logError(performProductSearch.name, error)
    throw error
  }
}
