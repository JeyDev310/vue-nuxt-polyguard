import { defineEventHandler, createError } from 'h3'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerRepository } from '~~/server/integrations/bigcommerce/customer'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

export default defineEventHandler(async (event) => {
  const bigCommerceStoreToken = useBigCommerceStoreToken(event)

  const storefrontToken = await bigCommerceStoreToken.getToken()
  const { customerId, customerAccessToken } = await useBigCommerceSession(event)
  if (!storefrontToken || !customerAccessToken || !customerId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    })
  }

  const bigCommerceCustomerRepository = createBigCommerceCustomerRepository({
    customerId,
  })

  return bigCommerceCustomerRepository.getAddresses()
})
