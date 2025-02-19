import type { ApiContext } from '#shared/types'
import { logError } from '~~/server/utils/error-handler'
import { useTextUtils } from '~/composables/useTextUtils'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
const { readingTime } = useTextUtils()

export async function getBlogPost(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetBlogPost({ uri })

    if (response?.entry?.__typename !== 'blogDefault_Entry') {
      return null
    }

    // return response?.entry
    return {
      id: response?.entry.id || '',
      status: response?.entry.status || '',
      title: response?.entry.title || '',
      slug: response?.entry.slug || '',
      uri: response?.entry.uri || '',
      postDate: response?.entry.postDate || '',
      dateUpdated: response?.entry.dateUpdated || '',
      excerptText: response?.entry.excerptText || '',
      blogPostContent: response?.entry.blogPostContent || '',
      blogFeaturedImage: response?.entry.blogFeaturedImage,
      blogCategories: response?.entry.blogCategories,
      readingTime: readingTime(response?.entry.blogPostContent ?? ''),
      seomatic: response?.entry.seomatic,
      contentAuthors: response?.entry.contentAuthors,
    }
  } catch (error) {
    logError(getBlogPost.name, error)
    throw error
  }
}
