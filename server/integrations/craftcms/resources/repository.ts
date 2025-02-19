import type { ApiContext } from '../../../../shared/types'
import { getResources } from '~~/server/integrations/craftcms/resources/api/get-resources'
import { getResourceCategories } from '~~/server/integrations/craftcms/resources/api/get-resource-categories'
import { getResourceDivisions } from '~~/server/integrations/craftcms/resources/api/get-resource-divisions'

export function createResourcesRepository({ env }: ApiContext) {
  interface FetchResourcesParams {
    page?: number
    pageSize?: number
    searchTerm?: string
    resourceDivisionsSlugs?: Array<string>
    resourceCategoriesSlugs?: Array<string>
  }

  async function fetchResources(params: FetchResourcesParams) {
    try {
      return await getResources(params, { env })
    } catch {
      return {
        entryCount: 0,
        resources: [],
      }
    }
  }

  async function fetchResourceCategories() {
    try {
      return await getResourceCategories({ env })
    } catch {
      return []
    }
  }

  async function fetchResourceDivisions() {
    try {
      return await getResourceDivisions({ env })
    } catch {
      return []
    }
  }

  return {
    fetchResources,
    fetchResourceCategories,
    fetchResourceDivisions,
  }
}
