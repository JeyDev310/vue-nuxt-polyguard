import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
export async function getPageHeroEntry(
  ids: Array<string>,
  context: ApiContext,
) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetPageHeroEntries({ ids })

    if (!response?.pageHeroFieldEntries) {
      return null
    }

    return response?.pageHeroFieldEntries
  } catch (error) {
    logError(getPageHeroEntry.name, error)
    throw error
  }
}
