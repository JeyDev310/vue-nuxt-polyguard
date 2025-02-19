import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

export async function getAllFaqs(context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetAllFaqs()

    const faqEntries = (response?.entries || [])
      .filter((faqEntry) => faqEntry?.__typename === 'faqsDefault_Entry')
      .filter((faqEntry) => faqEntry !== null && faqEntry !== undefined)
      .map((faqEntry) => {
        return {
          ...faqEntry,
          faqCategories: faqEntry.faqCategories
            .filter((category) => category !== null && category !== undefined)
            .filter(
              (category) =>
                category.__typename === 'faqCategoriesDefault_Entry',
            ),
        }
      })

    return {
      entryCount: response?.entryCount || 0,
      faqEntries,
    }
  } catch (error) {
    logError(getAllFaqs.name, error)
    throw error
  }
}
