import type { ApiContext } from '../../../../../shared/types'
import type { SaveTermContactUsSubmissionMutation } from '~~/server/codegen'
import type { TermContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveTermContactUsFormSubmission(
  submitData: TermContactUsFormDataType,
  context: ApiContext,
): Promise<SaveTermContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    return await sdk.saveTermContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
      state: submitData.state,
    })
  } catch (error) {
    logError(saveTermContactUsFormSubmission.name, error)
    throw error
  }
}
