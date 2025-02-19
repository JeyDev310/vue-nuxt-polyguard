import type { ApiContext } from '../../../../../shared/types'
import type { SaveresidentialContactUsSubmissionMutation } from '~~/server/codegen'
import type { residentialContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveresidentialContactUsFormSubmission(
  submitData: residentialContactUsFormDataType,
  context: ApiContext,
): Promise<SaveresidentialContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    console.log('saveresidentialContact + ', submitData)
    return await sdk.saveresidentialContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber1: submitData.phoneNumber,
      companyName: submitData.companyName,
      message: submitData.message,
      city: submitData.city,
      state: submitData.state,
      wallConstructionType: submitData.wallConstructionType,
    })
  } catch (error) {
    logError(saveresidentialContactUsFormSubmission.name, error)
    throw error
  }
}
