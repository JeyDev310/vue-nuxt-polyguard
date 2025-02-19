import { useRuntimeConfig } from '#imports'

export interface BigCommerceSettings {
  storeHash: string
  apiClientId: string
  apiSecret: string
  apiToken: string
  defaultChannelId: number
}

export function getSettings(): BigCommerceSettings {
  const config = useRuntimeConfig()

  return {
    storeHash: config.bigcommerce.storeHash,
    apiClientId: config.bigcommerce.clientId,
    apiSecret: config.bigcommerce.clientSecret,
    apiToken: config.bigcommerce.accessToken,
    defaultChannelId: 1337391,
  }
}
