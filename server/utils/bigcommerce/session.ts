import type { H3Event } from 'h3'
import { useSession } from 'h3'
import { useRuntimeConfig } from '#imports'

export interface BigCommerceSession {
  customer?: {
    customerId: number
    email: string
    firstName: string
    lastName: string
    customerAccessToken: string
    customerAccessTokenExpiresAt: string
  }
}

/**
 * Calculates the maxAge in seconds between current time and expiration time
 * @param expiresAt ISO 8601 timestamp string (e.g. '2024-12-30T20:32:27Z')
 * @param currentTime ISO 8601 timestamp string for current time
 * @returns number of seconds until expiration
 */
// function calculateMaxAge(expiresAt: string, currentTime: string): number {
//   const expiresAtDate = new Date(expiresAt)
//   const currentDate = new Date(currentTime)
//   return Math.floor((expiresAtDate.getTime() - currentDate.getTime()) / 1000)
// }

export async function useBigCommerceSession(event: H3Event) {
  const config = useRuntimeConfig()

  const sessionPassword = config.session.password

  const { data, clear, update } = await useSession<BigCommerceSession>(event, {
    name: 'bc-session',
    password: sessionPassword,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  const customer = data.customer

  const customerAccessToken = customer?.customerAccessToken

  const customerAccessTokenExpiresAt = customer?.customerAccessTokenExpiresAt

  const customerId = customer?.customerId

  const isAuthenticated = customerId && customerAccessToken

  return {
    customer,
    customerId,
    customerAccessToken,
    customerAccessTokenExpiresAt,
    isAuthenticated,
    clear,
    update,
  }
}
