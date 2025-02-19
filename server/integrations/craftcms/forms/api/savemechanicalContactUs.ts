import type { ApiContext } from '../../../../../shared/types'
import type { SavemechanicalContactUsSubmissionMutation } from '~~/server/codegen'
import type { mechanicalContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function savemechanicalContactUsFormSubmission(
  submitData: mechanicalContactUsFormDataType,
  context: ApiContext,
): Promise<SavemechanicalContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    console.log('savemechanicalContact + ', submitData)
    return await sdk.savemechanicalContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
    })
  } catch (error) {
    logError(savemechanicalContactUsFormSubmission.name, error)
    throw error
  }
}
