import type { ApiContext } from '~~/shared/types'
import { getDynamicRoutes } from '~~/server/integrations/craftcms/routes/api/get-dynamic-routes'
import { getRetourRedirects } from '~~/server/integrations/craftcms/routes/api/get-retour-redirects'

export function createRoutesRepository({ env }: ApiContext) {
  async function fetchDynamicRoutes() {
    try {
      return await getDynamicRoutes({ env })
    } catch {
      return []
    }
  }

  async function fetchRedirects() {
    try {
      return await getRetourRedirects({ env })
    } catch {
      return []
    }
  }

  return {
    fetchRedirects,
    fetchDynamicRoutes,
  }
}
