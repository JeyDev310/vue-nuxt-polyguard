import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'
export async function getStandardContentBuilderEntry(
  ids: Array<string>,
  context: ApiContext,
) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetStandardContentBuilderEntries({ ids })

    if (!response?.standardContentBuilderFieldEntries) {
      return null
    }

    return response?.standardContentBuilderFieldEntries
  } catch (error) {
    logError(getStandardContentBuilderEntry.name, error)
    throw error
  }
}
