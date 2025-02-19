import type { ApiContext } from '../../../../shared/types'
import { getPage } from '~~/server/integrations/craftcms/pages/api/get-page'

export function createPagesRepository({ env }: ApiContext) {
  async function fetchPage(uri: string) {
    try {
      return await getPage(uri, { env })
    } catch {
      return null
    }
  }

  return {
    fetchPage,
  }
}
