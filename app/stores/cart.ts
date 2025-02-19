import { defineStore } from 'pinia'
import type { Cart } from '#shared/types'

interface CartStoreState {
  cart: Cart | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartStoreState => ({
    cart: null,
  }),
  getters: {
    getCartId(state): string | undefined {
      return state.cart?.id
    },
    getLineItems(state): Cart['items'] {
      return state.cart?.items || []
    },
    getTotalLineItemsQty(): number {
      return this.getLineItems.reduce(
        (acc: number, item: CartItem) => acc + item.quantity,
        0,
      )
    },
  },
  actions: {
    setCart(value: Cart | null): void {
      this.cart = value
    },
  },
})
