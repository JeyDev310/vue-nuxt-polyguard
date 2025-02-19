import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { createBigCommerceStorefrontRepository } from '~~/server/integrations/bigcommerce/storefront'
import type { H3Event } from 'h3'

const bigCommerceStorefrontRepository = createBigCommerceStorefrontRepository()

export function useBigCommerceStoreToken(event: H3Event) {
  const bigCommerceCookies = useBigCommerceCookies(event)

  async function getToken() {
    let storefrontToken = bigCommerceCookies.getStorefrontToken()
    if (!storefrontToken) {
      const expiresInSeconds = 60 * 60 * 24 * 30 // 30 days
      storefrontToken =
        await bigCommerceStorefrontRepository.getStorefrontToken(
          expiresInSeconds,
        )
      bigCommerceCookies.setStorefrontToken(storefrontToken)
    }

    return storefrontToken
  }

  return {
    getToken,
  }
}
