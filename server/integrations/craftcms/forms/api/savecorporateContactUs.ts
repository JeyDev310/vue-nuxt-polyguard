import type { ApiContext } from '../../../../../shared/types'
import type { SavecorporateContactUsSubmissionMutation } from '~~/server/codegen'
import type { corporateContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function savecorporateContactUsFormSubmission(
  submitData: corporateContactUsFormDataType,
  context: ApiContext,
): Promise<SavecorporateContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    return await sdk.savecorporateContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
      jobLocation: { state: submitData.state },
    })
  } catch (error) {
    logError(savecorporateContactUsFormSubmission.name, error)
    throw error
  }
}
