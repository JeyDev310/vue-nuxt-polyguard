import { getSiteFooter } from './api/get-site-footer'
import { getStickyBarCta } from './api/get-sticky-bar-cta'
import type { ApiContext } from '~~/shared/types'

export function createSinglesRepository({ env }: ApiContext) {
  async function fetchSiteFooter() {
    try {
      return await getSiteFooter({ env })
    } catch {
      return null
    }
  }

  async function fetchStickyBarCta() {
    try {
      return await getStickyBarCta({ env })
    } catch {
      return null
    }
  }

  return {
    fetchSiteFooter,
    fetchStickyBarCta,
  }
}
