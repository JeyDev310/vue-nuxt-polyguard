import { createError, defineEventHandler } from 'h3'
import { useValidatedParams, z } from 'h3-zod'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerRepository } from '~~/server/integrations/bigcommerce/customer'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

const GetCustomerOrderParamsSchema = z.object({
  id: z.coerce.number(),
} as const)

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

  const { id: orderId } = await useValidatedParams(
    event,
    GetCustomerOrderParamsSchema,
  )

  const bigCommerceCustomerRepository = createBigCommerceCustomerRepository({
    customerId,
  })

  return bigCommerceCustomerRepository.getOrderById(orderId)
})
