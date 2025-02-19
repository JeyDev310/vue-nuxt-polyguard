import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import type { RetourRedirect } from '~~/server/integrations/craftcms/routes/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'

export async function getRetourRedirects(
  context: ApiContext,
): Promise<Array<RetourRedirect>> {
  try {
    const redirects: RetourRedirect[] = []

    const sdk = createGraphqlRequestSdk(context)
    const { retourRedirects } = await sdk.GetRetourRedirects()
    if (!retourRedirects) {
      return []
    }

    retourRedirects.forEach((retourRedirect) => {
      if (!retourRedirect) {
        return
      }

      const from = retourRedirect.redirectSrcUrl
      if (!from) {
        return
      }

      // Retour hack for the Craft CMS redirect to control panel when headless
      if (from === '/') {
        return
      }

      let matchType: RetourRedirect['matchType'] = 'exactmatch'
      if (retourRedirect.redirectMatchType === 'regexmatch') {
        matchType = 'regexmatch'
      }

      redirects.push({
        from,
        to: retourRedirect.redirectDestUrl || '/',
        status: Number(retourRedirect.redirectHttpCode),
        matchType,
        force: true,
      })
    })

    return redirects
  } catch (error) {
    logError(getRetourRedirects.name, error)
    throw error
  }
}
