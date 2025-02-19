import type { ApiContext } from '#shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function getBlogCategory(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetBlogCategory({ uri })

    if (response?.entry?.__typename !== 'blogCategoriesDefault_Entry') {
      return null
    }

    return response?.entry
  } catch (error) {
    logError(getBlogCategory.name, error)
    throw error
  }
}
