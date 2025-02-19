import { defineEventHandler } from 'h3'
import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerAuthRepository } from '~~/server/integrations/bigcommerce/auth'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

export default defineEventHandler(async (event) => {
  const bigCommerceCookies = useBigCommerceCookies(event)
  const bigCommerceStoreToken = useBigCommerceStoreToken(event)
  const bigCommerceSession = await useBigCommerceSession(event)

  const storefrontToken = await bigCommerceStoreToken.getToken()

  const bigCommerceCustomerAuthRepository =
    createBigCommerceCustomerAuthRepository({
      storefrontToken,
    })

  await bigCommerceCustomerAuthRepository.logout()
  bigCommerceCookies.deleteAll()
  await bigCommerceSession.clear()
  return { success: true }
})
