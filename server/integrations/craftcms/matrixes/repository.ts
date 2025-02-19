import type { ApiContext } from '~~/shared/types'
import { getPageHeroEntry } from '~~/server/integrations/craftcms/matrixes/api/get-page-hero-entry'
import { getStandardContentBuilderEntry } from '~~/server/integrations/craftcms/matrixes/api/get-standard-content-builder-entry'

export function createMatrixesRepository({ env }: ApiContext) {
  async function fetchPageHeroEntry(ids: Array<string>) {
    try {
      return await getPageHeroEntry(ids, { env })
    } catch {
      return null
    }
  }

  async function fetchStandardContentBuilderEntry(ids: Array<string>) {
    try {
      return await getStandardContentBuilderEntry(ids, { env })
    } catch {
      return null
    }
  }

  return {
    fetchPageHeroEntry,
    fetchStandardContentBuilderEntry,
  }
}
