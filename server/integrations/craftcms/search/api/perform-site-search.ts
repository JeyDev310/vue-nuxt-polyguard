import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

export async function performSiteSearch(
  searchTerm: string,
  context: ApiContext,
) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const variables = {
      searchTerm,
    }

    const response = await sdk.SiteSearch(variables)

    return {
      products:
        response?.products
          ?.filter((product) => product !== null && product !== undefined)
          .filter(
            (product) => product?.__typename === 'simpleProduct_Product',
          ) ?? [],
      blogPosts:
        response?.blogPosts
          ?.filter((entry) => entry !== null && entry !== undefined)
          .filter((entry) => entry?.__typename === 'blogDefault_Entry')
          .map((blogPost) => {
            return {
              ...blogPost,
              blogFeaturedImage: blogPost.blogFeaturedImage
                .filter((image) => image !== null && image !== undefined)
                .filter((image) => image.__typename === 'blogMedia_Asset'),
              blogCategories: blogPost.blogCategories
                .filter(
                  (category) => category !== null && category !== undefined,
                )
                .filter(
                  (category) =>
                    category.__typename === 'blogCategoriesDefault_Entry',
                ),
            }
          }) ?? [],
      resources:
        response?.resources
          ?.filter((entry) => entry !== null && entry !== undefined)
          .filter(
            (entry) =>
              entry?.__typename === 'resourcesFileDownload_Entry' ||
              entry?.__typename === 'resourcesPageLink_Entry',
          ) ?? [],
    }
  } catch (error) {
    logError(performSiteSearch.name, error)
    throw error
  }
}
