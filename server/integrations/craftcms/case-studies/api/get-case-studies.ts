import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'

interface Params {
  limit?: number
  offset?: number
  categoryUris?: string[]
}

export async function getCaseStudies(params: Params, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetCaseStudies()

    const caseStudiesEntries = (response?.caseStudiesEntries || [])
      .filter(
        (caseStudiesEntry) =>
          caseStudiesEntry?.__typename === 'caseStudiesDefault_Entry',
      )
      .filter(
        (caseStudiesEntry) =>
          caseStudiesEntry !== null && caseStudiesEntry !== undefined,
      )
      .map((caseStudiesEntry) => {
        return {
          ...caseStudiesEntry,
          caseStudyCategories: caseStudiesEntry?.caseStudyCategories
            .filter((category) => category !== null && category !== undefined)
            .filter(
              (category) =>
                category.__typename === 'caseStudyCategoriesDefault_Entry',
            ),
        }
      })

    return {
      entryCount: response?.entryCount || 0,
      caseStudiesEntries,
    }
  } catch (error) {
    logError(getCaseStudies.name, error)
    throw error
  }
}
