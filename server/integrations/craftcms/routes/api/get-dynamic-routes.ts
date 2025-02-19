import { withLeadingSlash, withoutLeadingSlash } from 'ufo'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

const extraRoutes: string[] = []

const blacklistedRoutes: string[] = ['__home__']

export async function getDynamicRoutes(
  context: ApiContext,
): Promise<Array<string>> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const dynamicRoutes = await sdk.GetDynamicRoutes()

    const _routes: string[] = []

    dynamicRoutes.pages?.forEach((page) => {
      if (page && page.uri) {
        _routes.push(page.uri)
      }
    })

    dynamicRoutes.blogPosts?.forEach((post) => {
      if (post && post.uri) {
        _routes.push(post.uri)
      }
    })

    dynamicRoutes.blogCategories?.forEach((category) => {
      if (category && category.uri) {
        _routes.push(category.uri)
      }
    })

    dynamicRoutes.caseStudies?.forEach((caseStudy) => {
      if (caseStudy && caseStudy.uri) {
        _routes.push(caseStudy.uri)
      }
    })

    dynamicRoutes.productCategories?.forEach((productCategory) => {
      if (productCategory && productCategory.uri) {
        _routes.push(productCategory.uri)
      }
    })

    dynamicRoutes.products?.forEach((product) => {
      if (product && product.uri) {
        _routes.push(product.uri)
      }
    })

    // make sure they are unique
    return [...new Set(_routes.concat(extraRoutes))]
      .map((uri) => withoutLeadingSlash(uri))
      .filter((x: string) => !blacklistedRoutes.includes(x))
      .map((uri) => withLeadingSlash(uri))
      .toSorted()
  } catch (error) {
    logError(getDynamicRoutes.name, error)
    throw error
  }
}
