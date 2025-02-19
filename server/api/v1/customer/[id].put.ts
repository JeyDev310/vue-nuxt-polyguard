import { defineEventHandler, createError } from 'h3'
import { useValidatedBody, useValidatedParams, z } from 'h3-zod'
import { createBigCommerceCustomerRepository } from '~~/server/integrations/bigcommerce/customer'
import type { UpdateCustomerParams } from '~~/server/integrations/bigcommerce/customer'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

const UpdateCustomerParamsSchema = z.object({
  id: z.coerce.number(),
} as const)

const UpdateCustomerBodySchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  newPassword: z.string().optional(),
} as const)

export default defineEventHandler(async (event) => {
  const { customerId } = await useBigCommerceSession(event)

  const { id: targetId } = await useValidatedParams(
    event,
    UpdateCustomerParamsSchema,
  )

  if (!customerId || customerId !== targetId) {
    throw createError({
      statusCode: 403,
      message: 'Not authorized to update this customer',
    })
  }

  const body = await useValidatedBody(event, UpdateCustomerBodySchema)

  const bigCommerceCustomerRepository = createBigCommerceCustomerRepository({
    customerId,
  })

  const customer: UpdateCustomerParams = {
    email: body.email,
    first_name: body.firstName,
    last_name: body.lastName,
    company: body.company,
    phone: body.phone,
  }

  if (body.newPassword) {
    customer.authentication = {
      force_password_reset: false,
      new_password: body.newPassword,
    }
  }

  return await bigCommerceCustomerRepository.update(customer)
})
