import type { ApiContext } from '~~/shared/types'
import { getAllFaqs } from '~~/server/integrations/craftcms/faqs/api/get-all-faqs'
import { getFilteredFaqs } from '~~/server/integrations/craftcms/faqs/api/get-filtered-faqs'
import { getFaqListing } from './api/get-faqlisting'

export function createFaqsRepository({ env }: ApiContext) {
  async function fetchAllFaqs() {
    try {
      return await getAllFaqs({ env })
    } catch {
      return {
        faqEntries: [],
        entryCount: 0,
      }
    }
  }

  interface FetchFaqsParams {
    faqCategoriesIds?: Array<number>
  }

  async function fetchFilteredFaqs(params: FetchFaqsParams) {
    try {
      const { faqCategoriesIds = undefined } = params
      return await getFilteredFaqs({ faqCategoriesIds }, { env })
    } catch {
      return {
        faqEntries: [],
        entryCount: 0,
      }
    }
  }

  async function fetchFaqListing() {
    try {
      return await getFaqListing({ env })
    } catch {
      return {
        faqEntries: [],
        entryCount: 0,
      }
    }
  }

  return {
    fetchAllFaqs,
    fetchFilteredFaqs,
    fetchFaqListing,
  }
}
