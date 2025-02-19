<script setup lang="ts">
import { useBigCommerceCart } from '~/composables/useBigCommerceCart'
import LoaderSpinner from '~/components/common/LoaderSpinner.vue'
import { formatToUsd } from '~/utils/currency'

import { useCartStore } from '~/stores/cart'

import MiniCartLineItem from '~/components/cart/MiniCartLineItem.vue'

const bigCommerceCart = useBigCommerceCart()
const cartStore = useCartStore()

async function handleUpdateQty(
  id: string,
  options: {
    quantity: number
    productId: number
    variantId?: number
  },
) {
  await bigCommerceCart.updateLineItem(id, options)
}

async function handleDelete(id: string) {
  await bigCommerceCart.removeFromCart(id)
}

async function handleSendToCheckout() {
  await bigCommerceCart.sendToCheckout()
}
</script>

<template>
  <ClientOnly>
    <div
      class="absolute right-0 top-full z-50 mt-2 min-h-52 w-80 bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-96"
    >
      <div v-if="bigCommerceCart.isLoading.value">
        <div class="z-50 h-full w-full bg-gray-50 p-5">
          <div class="flex h-52 w-full flex-col items-center justify-center">
            <div class="flex items-center space-x-3">
              <LoaderSpinner color="primary" />
              <span>Updating cart...</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="flex w-full items-center justify-between border-b border-gray-200 p-5 pb-3"
        >
          <div class="text-base font-semibold text-black">
            Your shopping cart
          </div>
          <div
            v-if="cartStore.getTotalLineItemsQty > 0"
            class="text-sm text-gray-500"
          >
            {{ cartStore.getTotalLineItemsQty }}
            {{ cartStore.getTotalLineItemsQty > 1 ? 'items' : 'item' }}
          </div>
        </div>
        <div v-if="cartStore.getLineItems.length === 0">
          <div
            class="my-8 flex w-full flex-col items-center justify-center p-5"
          >
            <svg
              class="mb-4 h-12 w-12 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            <div class="text-sm text-black">Your cart is empty.</div>
          </div>
        </div>
        <div v-else>
          <div
            class="flex max-h-[calc(98vh-20rem)] w-full flex-col gap-3 overflow-y-scroll border-b border-gray-200 px-5 py-3"
          >
            <MiniCartLineItem
              v-for="item in cartStore.getLineItems"
              :key="item.id"
              :item="item"
              @update-qty="(value) => handleUpdateQty(item.id, value)"
              @delete="() => handleDelete(item.id)"
            />
          </div>
          <div class="flex w-full justify-between px-5 py-3">
            <div class="text-base font-semibold text-black">Total</div>
            <div class="text-base font-semibold text-black">
              {{ formatToUsd(cartStore.cart?.cartAmount ?? 0) }}
            </div>
          </div>
          <div class="w-full px-5 py-3">
            <span
              class="flex h-10 w-full items-center justify-center rounded-full bg-primary text-sm text-white"
              @click="handleSendToCheckout"
            >
              Checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
