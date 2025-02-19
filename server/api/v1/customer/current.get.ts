import { defineEventHandler } from 'h3'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerAuthRepository } from '~~/server/integrations/bigcommerce/auth'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

export default defineEventHandler(async (event) => {
  const bigCommerceStoreToken = useBigCommerceStoreToken(event)
  const { customerAccessToken } = await useBigCommerceSession(event)
  if (!customerAccessToken) {
    return null
  }

  const storefrontToken = await bigCommerceStoreToken.getToken()

  const bigCommerceCustomerAuthRepository =
    createBigCommerceCustomerAuthRepository({
      storefrontToken,
    })

  return await bigCommerceCustomerAuthRepository.getCustomerByAccessToken(
    customerAccessToken,
  )
})
