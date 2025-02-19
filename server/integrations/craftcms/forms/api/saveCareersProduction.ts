import type { ApiContext } from '../../../../../shared/types'
import type { SaveCareersProductionSubmissionMutation } from '~~/server/codegen'
import type { CareersProductionFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveCareersProductionSubmission(
  submitData: CareersProductionFormDataType,
  context: ApiContext,
): Promise<SaveCareersProductionSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)

    const uploadAsset = submitData.resume
      ? await sdk.saveFormieAsset({
          fileName: submitData.resume.fileName,
          fileData: submitData.resume.fileData,
        })
      : null
    return await sdk.saveCareersProductionSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
      resume: {
        assetId: parseInt(uploadAsset?.save_formsUploads_Asset?.id ?? '0') ?? 0,
      },
    })
  } catch (error) {
    logError(saveCareersProductionSubmission.name, error)
    throw error
  }
}
