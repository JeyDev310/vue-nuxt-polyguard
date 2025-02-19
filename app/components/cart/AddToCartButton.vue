<script setup lang="ts">
import { ref } from 'vue'
import type { AddToCartLineItem } from '#shared/types'
import { useBigCommerceCart } from '~/composables/useBigCommerceCart'
import LoaderSpinner from '~/components/common/LoaderSpinner.vue'

interface Props {
  productId: number
  qty?: number
  inStock?: boolean
  variantId?: number
}

const props = withDefaults(defineProps<Props>(), {
  qty: 1,
  variantId: undefined,
})

const bigCommerceCart = useBigCommerceCart()

// this element key is needed to force re-render of the button
// when the user clicks the button to add to cart
// this is needed to forget the hovered state of the button
const elementKey = ref<string>(generateRandomUniqueKey())

async function handleAddToCartClick() {
  const lineItemDetails: AddToCartLineItem = {
    quantity: props.qty,
    productId: props.productId,
  }
  if (props.variantId) {
    lineItemDetails.variantId = props.variantId
  }

  try {
    await bigCommerceCart.addToCart(lineItemDetails)
    console.log('Added to cart!')
    elementKey.value = generateRandomUniqueKey()
  } catch (error) {
    console.error('Failed to add to cart:', error)
  }
}

function generateRandomUniqueKey() {
  return [
    'AddToCartButton',
    props.productId,
    props.variantId || '-',
    Date.now(),
  ].join('--')
}
</script>

<template>
  <div>
    <div v-if="!inStock" class="prose">
      <p class="font-bold">Out of stock</p>
    </div>
    <div v-else class="flex w-full max-w-96">
      <div
        :key="elementKey"
        class="group relative h-12 w-full cursor-pointer overflow-hidden rounded-full border border-primary transition-all duration-1000"
        @click.prevent="handleAddToCartClick"
      >
        <div class="h-full w-full text-base tracking-wider">
          <div
            v-if="bigCommerceCart.isLoading.value"
            class="flex h-full w-full items-center justify-center space-x-2 bg-primary-dark px-10 text-white/50"
          >
            <LoaderSpinner color="light" />
            <span>Adding...</span>
          </div>
          <div v-else class="bg-white px-10">
            <span
              class="slider-bg absolute inset-0 -translate-x-full rounded-full bg-primary-dark transition-all duration-1000 group-hover:translate-x-0"
            />
            <span
              class="absolute inset-0 flex items-center justify-center text-primary transition-all duration-1000 group-hover:text-white"
            >
              Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//button {
//  // @apply disabled:!bg-primary/80;
//  @apply disabled:bg-primary/80;
//}
</style>
