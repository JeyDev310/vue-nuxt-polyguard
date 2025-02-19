import { defineEventHandler } from 'h3'
import { useBigCommerceCookies } from '~~/server/utils/bigcommerce/cookies'
import { createBigCommerceCartRepository } from '~~/server/integrations/bigcommerce/cart'

export default defineEventHandler(async (event) => {
  const bigCommerceCookies = useBigCommerceCookies(event)
  const bigCommerceCartRepository = createBigCommerceCartRepository()

  const cartId = bigCommerceCookies.getCartId()
  if (!cartId) {
    return null
  }

  return await bigCommerceCartRepository.getCartRedirectUrls(cartId)
})
