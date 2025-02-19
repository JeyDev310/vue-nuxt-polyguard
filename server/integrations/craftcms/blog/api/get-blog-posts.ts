import type { ApiContext } from '#shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

interface Params {
  page?: number
  pageSize?: number
  categoryUri?: string
  isFeatured?: boolean
}

export async function getBlogPosts(params: Params, context: ApiContext) {
  try {
    const {
      page = 1,
      pageSize = 30,
      categoryUri = undefined,
      isFeatured = undefined,
    } = params

    const offset = (page - 1) * pageSize

    const variables = {
      offset,
      limit: pageSize,
      categoryUris: categoryUri ? [categoryUri] : [],
      isFeatured,
    }

    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetBlogPosts(variables)

    const blogPosts = (response?.blogPostsEntries ?? [])
      .filter((blogPost) => blogPost !== null && blogPost !== undefined)
      .filter((blogPost) => blogPost.__typename === 'blogDefault_Entry')
      .map((blogPost) => {
        return {
          ...blogPost,
          postDate: blogPost.postDate as string,
          dateUpdated: blogPost.dateUpdated as string,
          contentAuthors: blogPost.contentAuthors
            .filter((author) => author !== null && author !== undefined)
            .filter(
              (author) => author.__typename === 'genericContentAuthor_Entry',
            ),
          blogFeaturedImage: blogPost.blogFeaturedImage
            .filter((image) => image !== null && image !== undefined)
            .filter((image) => image.__typename === 'blogMedia_Asset'),
          blogCategories: blogPost.blogCategories
            .filter((category) => category !== null && category !== undefined)
            .filter(
              (category) =>
                category.__typename === 'blogCategoriesDefault_Entry',
            ),
        }
      })

    return {
      entryCount: response?.entryCount || 0,
      blogPosts,
    }
  } catch (error) {
    logError(getBlogPosts.name, error)
    throw error
  }
}
