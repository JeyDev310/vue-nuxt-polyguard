import { createError, defineEventHandler } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { createBigCommerceCustomerRepository } from '~~/server/integrations/bigcommerce/customer'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

const CreateCustomerAddressBodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  country_code: z.string(),
  address1: z.string(),
  state_or_province: z.string(),
  postal_code: z.string(),
  company: z.string().optional(),
  address2: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
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

  const customerAddress = await useValidatedBody(
    event,
    CreateCustomerAddressBodySchema,
  )

  const bigCommerceCustomerRepository = createBigCommerceCustomerRepository({
    customerId,
  })

  return bigCommerceCustomerRepository.createAddress(customerAddress)
})
