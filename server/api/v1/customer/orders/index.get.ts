import { createError, defineEventHandler } from 'h3'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerRepository } from '~~/server/integrations/bigcommerce/customer'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

export default defineEventHandler(async (event) => {
  const { customerId, customerAccessToken } = await useBigCommerceSession(event)
  const bigCommerceStoreToken = useBigCommerceStoreToken(event)

  const storefrontToken = await bigCommerceStoreToken.getToken()
  if (!storefrontToken || !customerAccessToken || !customerId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    })
  }

  const bigCommerceCustomerRepository = createBigCommerceCustomerRepository({
    customerId,
  })

  return bigCommerceCustomerRepository.getOrders()
})
