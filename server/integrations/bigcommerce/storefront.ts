import { createBigCommerceRestClient } from '~~/server/utils/bigcommerce/clients'
import { getSettings } from '~~/server/utils/bigcommerce/settings'

export function createBigCommerceStorefrontRepository() {
  async function getStorefrontToken(expiresInSeconds: number): Promise<string> {
    const now = Math.floor(Date.now() / 1000)

    const settings = getSettings()

    const client = createBigCommerceRestClient({
      storeHash: settings.storeHash,
      accessToken: settings.apiToken,
    })

    const response = await client.post('/v3/storefront/api-token', {
      channel_ids: [settings.defaultChannelId],
      expires_at: now + expiresInSeconds,
    })

    return response.data.data.token
  }

  function getStoreUrl() {
    const { storeHash, defaultChannelId } = getSettings()
    if (defaultChannelId) {
      return `https://store-${storeHash}-${defaultChannelId}.mybigcommerce.com`
    }
    return `https://store-${storeHash}.mybigcommerce.com`
  }

  return {
    getStorefrontToken,
    getStoreUrl,
  }
}
