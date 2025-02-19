import { createError, defineEventHandler } from 'h3'
import { useValidatedParams, z } from 'h3-zod'
import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { createBigCommerceCartRepository } from '~~/server/integrations/bigcommerce/cart'

const bigCommerceCartRepository = createBigCommerceCartRepository()

export default defineEventHandler(async (event) => {
  const bigCommerceCookies = useBigCommerceCookies(event)
  const cartId = bigCommerceCookies.getCartId()

  if (!cartId) {
    throw createError({
      statusCode: 400,
      message: 'No cartId found in the cookie storage',
    })
  }

  const { id: itemId } = await useValidatedParams(event, {
    id: z.string({
      required_error: 'Item ID is required',
    }),
  })

  const cart = await bigCommerceCartRepository.removeCartItem({
    cartId,
    itemId,
  })
  if (!cart) {
    bigCommerceCookies.deleteCartId()
    return null
  }

  return cart
})
