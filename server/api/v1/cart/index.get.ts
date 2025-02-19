import { defineEventHandler } from 'h3'
import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { createBigCommerceCartRepository } from '~~/server/integrations/bigcommerce/cart'
import { useBigCommerceSession } from '~~/server/utils/bigcommerce/session'

const bigCommerceCartRepository = createBigCommerceCartRepository()

export default defineEventHandler(async (event) => {
  const bigCommerceCookies = useBigCommerceCookies(event)
  const { customerId } = await useBigCommerceSession(event)

  const cartId = bigCommerceCookies.getCartId()
  if (!cartId) {
    return null
  }

  let cart = await bigCommerceCartRepository.getCartById(cartId)

  if (!cart) {
    bigCommerceCookies.deleteCartId()
    return null
  }

  // Update the cart's customer ID if it's not already set
  if (customerId && cart.customerId !== customerId) {
    cart = await bigCommerceCartRepository.updateCustomerId(cartId, {
      customerId: customerId ?? 0,
    })
  }

  return cart
})
