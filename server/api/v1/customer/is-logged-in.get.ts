import { defineEventHandler } from 'h3'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

export default defineEventHandler(async (event) => {
  const { isAuthenticated } = await useBigCommerceSession(event)

  return isAuthenticated
})
