import { defineEventHandler, createError, type H3Event } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { jwtVerify } from 'jose'
import { hash } from 'bcrypt'
import { useBigCommerceManagementApi } from '~~/server/utils/bigcommerce/clients'
import { useTursoDb } from '~~/server/utils/turso'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const tursoDbClient = useTursoDb(config.turso)
const bigCommerceManagementApi = useBigCommerceManagementApi(config.bigcommerce)

export default defineEventHandler(async (event: H3Event) => {
  const { token, newPassword } = await useValidatedBody(event, {
    token: z.string(),
    newPassword: z.string(),
  })

  const customerId = await getCustomerIdFromToken(token)

  await checkTokenPresenceInDatabase(customerId, token)

  await updatePasswordInBigCommerce(newPassword, customerId)

  await deleteUsedTokenFromDatabase(customerId, token)

  return { message: 'Password reset successful' }
})

async function getCustomerIdFromToken(token: string): Promise<number> {
  let decodedToken

  // Verify token
  try {
    decodedToken = (
      await jwtVerify(token, new TextEncoder().encode(config.auth.jwtSecret))
    ).payload
  } catch {
    throw createError({
      statusCode: 400,
      message: 'Invalid token',
    })
  }

  // Validate decoded token
  const TokenSchema = z.object({
    customerId: z.number(),
  })

  const parsedToken = TokenSchema.safeParse(decodedToken)

  if (!parsedToken.success) {
    throw createError({
      statusCode: 400,
      message: 'Token validation failed',
    })
  }

  return parsedToken.data?.customerId
}

async function checkTokenPresenceInDatabase(customerId: number, token: string) {
  let numberOfFoundTokens: number = 0
  try {
    // Check if token exists in database and is not expired
    const result = await tursoDbClient.execute({
      sql: 'SELECT * FROM password_reset_tokens WHERE customer_id = ? AND token = ? AND expires_at > datetime("now")',
      args: [customerId, token],
    })

    numberOfFoundTokens = result.rows.length
  } catch (error) {
    console.error('Error checking token in database:', error)
    throw createError({
      statusCode: 500,
      message: 'Error checking token in database',
    })
  }

  if (numberOfFoundTokens === 0) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or expired token',
    })
  }
}

async function updatePasswordInBigCommerce(
  newPassword: string,
  customerId: number,
) {
  try {
    // Hash new password
    const hashedPassword = await hash(newPassword, 10)
    await bigCommerceManagementApi.put(`/customers/${customerId}`, {
      password: hashedPassword,
    })
  } catch (error) {
    console.error('Error updating password in BigCommerce:', error)
    throw createError({
      statusCode: 500,
      message: 'Error updating password in BigCommerce',
    })
  }
}

async function deleteUsedTokenFromDatabase(customerId: number, token: string) {
  try {
    await tursoDbClient.execute({
      sql: 'DELETE FROM password_reset_tokens WHERE customer_id = ? AND token = ?',
      args: [customerId, token],
    })
  } catch (error) {
    console.error('Error deleting token from database:', error)
    throw createError({
      statusCode: 500,
      message: 'Error deleting token from database',
    })
  }
}
