import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

interface Params {
  page?: number
  pageSize?: number
  productCategoryIds?: Array<number>
  productDivisionIds?: Array<number>
}

export async function getProducts(params: Params, context: ApiContext) {
  try {
    const {
      page = 1,
      pageSize = 12,
      productCategoryIds = null,
      productDivisionIds = null,
    } = params

    const offset = (page - 1) * pageSize

    const variables = {
      offset,
      limit: pageSize,
      productCategoryIds,
      productDivisionIds,
    }

    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetProducts(variables)

    return {
      productCount: response?.productCount || 0,
      products: response.products,
    }
  } catch (error) {
    logError(getProducts.name, error)
    throw error
  }
}
