import { ClientError } from 'graphql-request'
import { createError, defineEventHandler } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'
import { createBigCommerceCustomerAuthRepository } from '~~/server/integrations/bigcommerce/auth'

export default defineEventHandler(async (event) => {
  const bigCommerceStoreToken = useBigCommerceStoreToken(event)
  const bigCommerceSession = await useBigCommerceSession(event)

  const storefrontToken = await bigCommerceStoreToken.getToken()

  const bigCommerceCustomerAuthRepository =
    createBigCommerceCustomerAuthRepository({
      storefrontToken,
    })

  const body = await useValidatedBody(event, {
    email: z.string(),
    password: z.string(),
  })

  type LoginCustomerResponse = Awaited<
    ReturnType<typeof bigCommerceCustomerAuthRepository.login>
  >

  let customerLoginResponse: LoginCustomerResponse

  try {
    customerLoginResponse = await bigCommerceCustomerAuthRepository.login(
      body.email,
      body.password,
    )
  } catch (error) {
    if (error instanceof ClientError) {
      const errorMessages = error.response.errors
        ?.map((error) => error.message)
        .join(' ')

      throw createError({
        statusCode: 401,
        statusText: 'Unauthorized',
        message: errorMessages,
      })
    }

    throw createError({
      statusCode: 401,
      message: 'Error while logging in',
    })
  }

  const customerAccessToken =
    customerLoginResponse?.login?.customerAccessToken?.value
  const customerAccessTokenExpiresAt =
    customerLoginResponse?.login?.customerAccessToken?.expiresAt
  if (!customerAccessToken || !customerAccessTokenExpiresAt) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  const customer = customerLoginResponse?.login?.customer

  const customerId = customer?.entityId
  if (!customerId) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  await bigCommerceSession.update({
    customer: {
      customerId,
      customerAccessToken,
      customerAccessTokenExpiresAt,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
    },
  })

  return { customer }
})
