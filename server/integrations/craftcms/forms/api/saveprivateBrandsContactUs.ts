import type { ApiContext } from '../../../../../shared/types'
import type { SaveprivateBrandsContactUsSubmissionMutation } from '~~/server/codegen'
import type { privateBrandsContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveprivateBrandsContactUsFormSubmission(
  submitData: privateBrandsContactUsFormDataType,
  context: ApiContext,
): Promise<SaveprivateBrandsContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    return await sdk.saveprivateBrandsContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
    })
  } catch (error) {
    logError(saveprivateBrandsContactUsFormSubmission.name, error)
    throw error
  }
}
