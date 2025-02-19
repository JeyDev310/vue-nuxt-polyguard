import type { ApiContext } from '#shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import { serializeBlogCategories } from '~~/server/integrations/craftcms/blog/serializers/blog-post-categories-serializer'

export async function getBlogCategories(context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetBlogCategories()

    return serializeBlogCategories(response?.entries ?? [])
  } catch (error) {
    logError(getBlogCategories.name, error)
    throw error
  }
}
