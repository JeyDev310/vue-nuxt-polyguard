import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '#shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getStickyBarCta(context: ApiContext = {}) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetStickyBarCta()
    if (!response?.entry) {
      return null
    }

    return response.entry.__typename === 'ctasStickyBar_Entry'
      ? response.entry
      : null
  } catch (error) {
    logError(getStickyBarCta.name, error)
    throw error
  }
}
