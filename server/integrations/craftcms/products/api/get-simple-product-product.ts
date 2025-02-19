import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { serializeSimpleProductResponse } from '~~/server/integrations/craftcms/products/serializers/simple-product-serializer'

export async function getSimpleProductProduct(
  uri: string,
  context: ApiContext,
) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetSimpleProductProduct({ uri })

    return serializeSimpleProductResponse(response)
  } catch (error) {
    logError(getSimpleProductProduct.name, error)
    throw error
  }
}
