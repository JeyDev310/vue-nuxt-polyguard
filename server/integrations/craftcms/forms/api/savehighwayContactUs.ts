import type { ApiContext } from '../../../../../shared/types'
import type { SavehighwayContactUsSubmissionMutation } from '~~/server/codegen'
import type { highwayContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function savehighwayContactUsFormSubmission(
  submitData: highwayContactUsFormDataType,
  context: ApiContext,
): Promise<SavehighwayContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    console.log('savehighwayContact + ', submitData)
    return await sdk.savehighwayContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
    })
  } catch (error) {
    logError(savehighwayContactUsFormSubmission.name, error)
    throw error
  }
}
