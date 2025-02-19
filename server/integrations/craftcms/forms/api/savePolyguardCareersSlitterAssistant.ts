import type { ApiContext } from '../../../../../shared/types'
import type { SavePolyguardCareersSlitterAssistantSubmissionMutation } from '~~/server/codegen'
import type { PolyguardCareersSlitterAssistantFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function savePolyguardCareersSlitterAssistantSubmission(
  submitData: PolyguardCareersSlitterAssistantFormDataType,
  context: ApiContext,
): Promise<SavePolyguardCareersSlitterAssistantSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)

    const uploadAsset = submitData.resume
      ? await sdk.saveFormieAsset({
          fileName: submitData.resume.fileName,
          fileData: submitData.resume.fileData,
        })
      : null
    return await sdk.savePolyguardCareersSlitterAssistantSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
      resume: {
        assetId: parseInt(uploadAsset?.save_formsUploads_Asset?.id ?? '0') ?? 0,
      },
    })
  } catch (error) {
    logError(savePolyguardCareersSlitterAssistantSubmission.name, error)
    throw error
  }
}
