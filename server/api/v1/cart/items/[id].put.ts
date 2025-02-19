import { defineEventHandler, createError } from 'h3'
import { useValidatedBody, useValidatedParams, z } from 'h3-zod'
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

  const { quantity, productId, variantId } = await useValidatedBody(event, {
    quantity: z.number({
      required_error: 'Quantity is required',
    }),
    productId: z.number({
      required_error: 'Product ID is required',
    }),
    variantId: z.number().optional(),
  })

  return await bigCommerceCartRepository.updateCartItem({
    cartId,
    itemId,
    lineItem: {
      quantity,
      productId,
      variantId,
    },
  })
})
