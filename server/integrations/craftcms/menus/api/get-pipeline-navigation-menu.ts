import { logError } from '~~/server/utils/error-handler'
import type { ApiContext } from '~~/shared/types'
import { createGraphqlRequestSdk } from '~~/server/utils/craft/create-graphql-request-sdk'
import { normalizeNodeUri } from '~~/server/integrations/craftcms/menus/serializers/normalize-node-uri'

const navHandle = 'pipelineNavigation'

export async function getPipelineNavigationMenu(context: ApiContext = {}) {
  try {
    const sdk = createGraphqlRequestSdk(context)
    const response = await sdk.GetMenuByNavHandle({
      navHandle,
    })

    return (response?.navigationNodes || [])
      .filter((n) => n !== null && n !== undefined)
      .filter((n) => n.__typename === `${navHandle}_Node`)
      .map((n) => ({
        ...n,
        nodeUri: normalizeNodeUri(n.nodeUri),
        children: (n.children || [])
          .filter((cn) => cn !== null && cn !== undefined)
          .filter((cn) => cn.__typename === `${navHandle}_Node`)
          .map((cn) => ({
            ...cn,
            nodeUri: normalizeNodeUri(cn.nodeUri),
          })),
      }))
  } catch (error) {
    logError(getPipelineNavigationMenu.name, error)
    throw error
  }
}
