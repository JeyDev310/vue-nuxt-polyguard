import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

export function useBigCommerceCookies(event: H3Event) {
  const cartIdCookieName = 'cartId' as const
  const storefrontToken = 'storefrontToken' as const

  function setCartId(cartId: string): void {
    setCookie(event, cartIdCookieName, cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  function getCartId(): string | undefined {
    return getCookie(event, cartIdCookieName)
  }

  function deleteCartId(): void {
    deleteCookie(event, cartIdCookieName)
  }

  function setStorefrontToken(token: string): void {
    setCookie(event, storefrontToken, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  function getStorefrontToken(): string | undefined {
    return getCookie(event, storefrontToken)
  }

  function deleteStorefrontToken(): void {
    deleteCookie(event, storefrontToken)
  }

  function deleteAll() {
    deleteCartId()
    deleteStorefrontToken()
  }

  return {
    setCartId,
    getCartId,
    deleteCartId,
    setStorefrontToken,
    getStorefrontToken,
    deleteStorefrontToken,
    deleteAll,
  }
}
