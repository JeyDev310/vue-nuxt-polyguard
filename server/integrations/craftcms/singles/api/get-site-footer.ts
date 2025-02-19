import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getSiteFooter(context: ApiContext = {}) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetSiteFooter()

    const entries = response?.siteFooterEntries
    if (!entries) {
      return null
    }

    const siteFooter = entries.filter(
      (entry) => entry?.__typename === 'globalsSiteFooter_Entry',
    )[0]
    if (!siteFooter) {
      return null
    }

    return {
      ...siteFooter,
      genericLogoImages: siteFooter.genericLogoImages
        .filter((image) => image?.__typename === 'media_Asset')
        .map((image) => ({
          url: image?.url,
          alt: image?.alt,
        })),
      socialLinks: siteFooter.socialLinks.filter(
        (sl) => sl?.__typename === 'globalsSocialLink_Entry',
      ),
    }
  } catch (error) {
    logError(getSiteFooter.name, error)
    throw error
  }
}
