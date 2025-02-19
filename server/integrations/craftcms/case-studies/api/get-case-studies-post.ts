import type { ApiContext } from '#shared/types'
import { logError } from '~~/server/utils/error-handler'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getCaseStudy(uri: string, context: ApiContext) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetCaseStudy({ uri })

    if (response?.entry?.__typename !== 'caseStudiesDefault_Entry') {
      return null
    }

    return response?.entry
  } catch (error) {
    logError(getCaseStudy.name, error)
    throw error
  }
}
