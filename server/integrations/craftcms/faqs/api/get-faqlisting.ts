import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

export async function getFaqListing(context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetFaqListing()

    const faqEntries = (response?.entries || [])
      .filter((faqEntry) => faqEntry?.__typename === 'faqsDefault_Entry')
      .filter((faqEntry) => faqEntry !== null && faqEntry !== undefined)
      .map((faqEntry) => {
        return {
          ...faqEntry,
        }
      })

    return {
      entryCount: response?.entryCount || 0,
      faqEntries,
    }
  } catch (error) {
    logError(getFaqListing.name, error)
    throw error
  }
}
