import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getProduct(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetProduct({ uri })

    return response.product
  } catch (error) {
    logError(getProduct.name, error)
    throw error
  }
}
