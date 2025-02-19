import type { ApiContext } from '../../../../../shared/types'
import type { SaveIAmInterestedInWorkingForPolyguardSubmissionMutation } from '~~/server/codegen'
import type { IAmInterestedInWorkingFormDataType } from '~~/server/integrations/craftcms/forms/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { logError } from '~~/server/utils/error-handler'

export async function saveIAmInterestedInWorkingForPolyguardSubmission(
  submitData: IAmInterestedInWorkingFormDataType,
  context: ApiContext,
): Promise<SaveIAmInterestedInWorkingForPolyguardSubmissionMutation | null> {
  try {
    const sdk = createGraphqlRequestSdk(context)

    const uploadAsset = submitData.resume
      ? await sdk.saveFormieAsset({
          fileName: submitData.resume.fileName,
          fileData: submitData.resume.fileData,
        })
      : null
    return await sdk.saveIAmInterestedInWorkingForPolyguardSubmission({
      yourName: submitData.yourName,
      emailAddress: submitData.emailAddress,
      phoneNumber: submitData.phoneNumber,
      message: submitData.message,
      resume: {
        assetId: parseInt(uploadAsset?.save_formsUploads_Asset?.id ?? '0') ?? 0,
      },
    })
  } catch (error) {
    logError(saveIAmInterestedInWorkingForPolyguardSubmission.name, error)
    throw error
  }
}
