import type { ApiContext } from '../../../../../shared/types'
import type { SavePipelineContactUsSubmissionMutation } from '~~/server/codegen'
import type { PipelineContactUsFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function savePipelineContactUsFormSubmission(
  submitData: PipelineContactUsFormDataType,
  context: ApiContext,
): Promise<SavePipelineContactUsSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)
    console.log('savepipelineContact + ', submitData)
    return await sdk.savePipelineContactUsSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
    })
  } catch (error) {
    logError(savePipelineContactUsFormSubmission.name, error)
    throw error
  }
}
