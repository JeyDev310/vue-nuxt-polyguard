import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import type { ApiContext } from '~~/shared/types'
import type { SaveFormieAssetMutation } from '~~/server/codegen'
import type { SubmitUploadType } from '~~/server/integrations/craftcms/forms/types'
import { logError } from '~~/server/utils/error-handler'

export async function saveFormieAsset(
  params: SubmitUploadType,
  context: ApiContext = {},
): Promise<SaveFormieAssetMutation | undefined> {
  if (!context.env) {
    throw new Error('context.env is required')
  }

  try {
    const sdk = createGraphqlRequestSdk(context)
    return await sdk.saveFormieAsset({
      ...params,
    })
  } catch (error) {
    console.error(error)
    logError(saveFormieAsset.name, error)
    return undefined
  }
}
