import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

interface Params {
  faqCategoriesIds?: Array<number>
}

export async function getFilteredFaqs(params: Params, context: ApiContext) {
  try {
    const { faqCategoriesIds = undefined } = params

    const variables = {
      faqCategoriesIds,
    }

    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetFilteredFaqs(variables)

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
    logError(getFilteredFaqs.name, error)
    throw error
  }
}
