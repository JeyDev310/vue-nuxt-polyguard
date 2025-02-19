import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getPage(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetPage({ uri })

    if (!response) {
      return null
    }

    // check if the response is one of the expected entry types defined in the pages section
    if (
      response?.entry?.__typename !== 'pagesChannelListing_Entry' &&
      response?.entry?.__typename !== 'pagesContentPage_Entry' &&
      response?.entry?.__typename !== 'pagesFaqListing_Entry' &&
      response?.entry?.__typename !== 'pagesLandingPage_Entry' &&
      response?.entry?.__typename !== 'pagesProductListing_Entry' &&
      response?.entry?.__typename !== 'pagesResourceListing_Entry'
    ) {
      return null
    }

    return response?.entry
  } catch (error) {
    logError(getPage.name, error)
    throw error
  }
}
