import { defineEventHandler } from 'h3'
import { useValidatedBody, z } from 'h3-zod'
import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { createBigCommerceCartRepository } from '~~/server/integrations/bigcommerce/cart'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

const AddToCartBodySchema = z.object({
  lineItem: z.object({
    quantity: z.number(),
    productId: z.number(),
    variantId: z.number().optional(),
  }),
} as const)

const bigCommerceCartRepository = createBigCommerceCartRepository()

export default defineEventHandler(async (event) => {
  const bigCommerceCookies = useBigCommerceCookies(event)
  const { customerId } = await useBigCommerceSession(event)

  const { lineItem } = await useValidatedBody(event, AddToCartBodySchema)

  const cartId = bigCommerceCookies.getCartId()
  if (cartId) {
    return await bigCommerceCartRepository.addToCart({ cartId, lineItem })
  }

  const { id: emptyCartId } =
    await bigCommerceCartRepository.createEmptyCart(customerId)

  bigCommerceCookies.setCartId(emptyCartId)

  return await bigCommerceCartRepository.addToCart({
    cartId: emptyCartId,
    lineItem,
  })
})
