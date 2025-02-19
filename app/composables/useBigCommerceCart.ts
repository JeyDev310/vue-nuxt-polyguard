import { ref, navigateTo } from '#imports'
import type { AddToCartLineItem, Cart } from '#shared/types'
import { useCartStore } from '~/stores/cart'

export function useBigCommerceCart() {
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const cartStore = useCartStore()

  type LineItemUpdateOptions = {
    quantity: number
    productId: number
    variantId?: number
  }

  async function getCurrentCart(): Promise<Cart | null> {
    isLoading.value = true
    error.value = null

    try {
      const cart = await $fetch('/api/v1/cart')
      cartStore.setCart(cart)
      return cart
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(lineItem: AddToCartLineItem): Promise<Cart> {
    isLoading.value = true
    error.value = null

    try {
      const cart = await $fetch('/api/v1/cart/items', {
        method: 'POST',
        body: { lineItem },
      })
      cartStore.setCart(cart)

      return cart
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateLineItem(
    id: string,
    item: LineItemUpdateOptions,
  ): Promise<Cart> {
    isLoading.value = true
    error.value = null

    try {
      const cart = await $fetch(`/api/v1/cart/items/${id}`, {
        method: 'PUT',
        body: { ...item },
      })

      cartStore.setCart(cart)

      return cart
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function removeFromCart(id: string): Promise<Cart | null> {
    isLoading.value = true
    error.value = null

    try {
      const cart = await $fetch(`/api/v1/cart/items/${id}`, {
        method: 'DELETE',
        body: { id },
      })

      cartStore.setCart(cart)

      return cart
    } catch (err) {
      error.value = err as Error
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function resetCart() {
    cartStore.$reset()
  }

  async function sendToCheckout() {
    error.value = null

    try {
      const response = await $fetch(`/api/v1/cart/checkout`, {
        method: 'POST',
        body: {},
        credentials: 'include',
      })

      if (response) {
        await navigateTo(response.checkout_url, { external: true })
      }
    } catch (err) {
      error.value = err as Error
      throw err
    }
  }

  return {
    getCurrentCart,
    addToCart,
    updateLineItem,
    removeFromCart,
    sendToCheckout,
    resetCart,
    isLoading,
    error,
  }
}
