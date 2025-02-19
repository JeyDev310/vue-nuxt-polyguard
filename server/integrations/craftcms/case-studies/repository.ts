import type { ApiContext } from '~~/shared/types'
import { getCaseStudies } from '~~/server/integrations/craftcms/case-studies/api/get-case-studies'
import { getCaseStudy } from './api/get-case-studies-post'

export function createCaseStudiesRepository({ env }: ApiContext) {
  interface FetchCaseStudiesParams {
    limit?: number
    offset?: number
    categoryUris?: string[]
  }

  async function fetchCaseStudies(params: FetchCaseStudiesParams) {
    try {
      const { limit, offset, categoryUris } = params
      return await getCaseStudies({ limit, offset, categoryUris }, { env })
    } catch {
      return {
        caseStudiesEntries: [],
        entryCount: 0,
      }
    }
  }

  async function fetchCaseStudy(uri: string) {
    try {
      return await getCaseStudy(uri, { env })
    } catch {
      return null
    }
  }
  return {
    fetchCaseStudies,
    fetchCaseStudy,
  }
}
