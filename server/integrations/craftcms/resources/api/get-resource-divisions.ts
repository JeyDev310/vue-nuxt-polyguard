import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getResourceDivisions(context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetResourceDivisions()
    return (response?.resourceDivisionsEntries || [])
      .filter((rd) => rd !== null && rd !== undefined)
      .filter((rd) => rd.__typename === 'resourceDivisionsDefault_Entry')
  } catch (error) {
    logError(getResourceDivisions.name, error)
    throw error
  }
}
