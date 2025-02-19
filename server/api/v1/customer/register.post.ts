import { defineEventHandler } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { createBigCommerceCustomerAuthRepository } from '~~/server/integrations/bigcommerce/auth'
import { useBigCommerceStoreToken } from '~~/server/utils/bigcommerce/store-token'

const RegisterCustomerBodySchema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .email({ message: 'Email is invalid!' }),
  password: z.string({ required_error: 'Password is required!' }).min(8, {
    message: 'Password must be at least 8 characters long!',
  }),
  firstName: z.string({ required_error: 'First Name is required!' }).min(3, {
    message: 'First Name must be at least 3 characters long!',
  }),
  lastName: z.string({ required_error: 'Last Name is required!' }).min(3, {
    message: 'Last Name must be at least 3 characters long!',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const { email, password, company, phone, lastName, firstName } =
    await useValidatedBody(event, RegisterCustomerBodySchema)

  const bigCommerceStoreToken = useBigCommerceStoreToken(event)
  const storefrontToken = await bigCommerceStoreToken.getToken()

  const bigCommerceCustomerAuthRepository =
    createBigCommerceCustomerAuthRepository({
      storefrontToken,
    })

  return bigCommerceCustomerAuthRepository.createCustomer({
    email,
    company,
    phone,
    lastName,
    firstName,
    password,
  })
})
