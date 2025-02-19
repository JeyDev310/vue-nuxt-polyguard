import type { ApiContext } from '../../../../../shared/types'
import type { SaveArchitecturalContactUsSubmissionMutation } from '~~/server/codegen'
import type { ArchitecturalContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveArchitecturalContactUsFormSubmission(
  submitData: ArchitecturalContactUsFormDataType,
  context: ApiContext,
): Promise<SaveArchitecturalContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    console.log('saveresidentialContact + ', submitData)
    return await sdk.saveArchitecturalContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      companyName: submitData.companyName,
      message: submitData.message,
      city: submitData.city,
      state: submitData.state,
    })
  } catch (error) {
    logError(saveArchitecturalContactUsFormSubmission.name, error)
    throw error
  }
}
