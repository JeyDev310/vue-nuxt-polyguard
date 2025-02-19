import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

interface Params {
  page?: number
  pageSize?: number
  searchTerm?: string
  resourceDivisionsSlugs?: Array<string>
  resourceCategoriesSlugs?: Array<string>
}

export async function getResources(params: Params, context: ApiContext) {
  try {
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    const searchTerm = params.searchTerm ?? ''
    const resourceDivisionsSlugs = params.resourceDivisionsSlugs ?? []
    const resourceCategoriesSlugs = params.resourceCategoriesSlugs ?? []

    const offset = (page - 1) * pageSize
    const variables = {
      offset,
      limit: pageSize,
      resourceDivisionsSlugs,
      resourceCategoriesSlugs,
      searchTerm,
    }

    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetResources(variables)

    const resources = (response.resourcesEntries || [])
      .filter((r) => r !== null && r !== undefined)
      .filter(
        (r) =>
          r.__typename === 'resourcesFileDownload_Entry' ||
          r.__typename === 'resourcesPageLink_Entry',
      )
      .map((r) => {
        if (r.__typename === 'resourcesPageLink_Entry') {
          return {
            ...r,
            resourceDivisions: (r.resourceDivisions || [])
              .filter((rd) => rd !== null && rd !== undefined)
              .filter(
                (rd) => rd.__typename === 'resourceDivisionsDefault_Entry',
              ),
          }
        }

        return {
          ...r,
          resourceDivisions: (r.resourceDivisions || [])
            .filter((rd) => rd !== null && rd !== undefined)
            .filter((rd) => rd.__typename === 'resourceDivisionsDefault_Entry'),
          resourceAssets: (r.resourceAssets || [])
            .filter((ra) => ra !== null && ra !== undefined)
            .filter((ra) => ra.__typename === 'resources_Asset'),
        }
      })

    return {
      entryCount: response.entryCount,
      resources,
    }
  } catch (error) {
    logError(getResources.name, error)
    throw error
  }
}
