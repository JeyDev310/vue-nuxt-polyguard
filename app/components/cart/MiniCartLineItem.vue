<script setup lang="ts">
import type { CartItem } from '#shared/types'
import { formatToUsd } from '~/utils/currency'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

interface Emits {
  (
    event: 'updateQty',
    options: { quantity: number; productId: number; variantId?: number },
  ): void
  (event: 'delete'): void
}

const emit = defineEmits<Emits>()

const salePrice = computed(() => {
  return props.item.salePrice
})

function handleUpdateQty(event: Event) {
  const _target = event.target
  if (!(_target instanceof HTMLSelectElement)) return

  const quantity = parseInt(_target.value)
  emit('updateQty', {
    quantity,
    productId: props.item.productId,
    variantId: props.item.variantId,
  })
}

function handleDelete() {
  emit('delete')
}
</script>

<template>
  <li class="flex flex-row items-center space-x-2 py-4">
    <div class="ml-2 flex flex-1 flex-col">
      <div>
        <div
          class="flex items-center justify-between text-base font-medium text-gray-900"
        >
          <div
            class="flex w-9/12 flex-row items-center justify-start space-x-2"
          >
            <img
              :src="props.item.imageUrl"
              :alt="props.item.name"
              class="h-8 w-8 rounded-full"
            />
            <div class="flex flex-col justify-start space-y-1">
              <div class="inline-block text-left text-xs leading-tight">
                {{ props.item.name }}
              </div>
              <div
                class="inline-block text-left text-xs leading-tight text-gray-400"
              >
                {{ props.item.sku }}
              </div>
            </div>
          </div>
          <div class="flex w-3/12 justify-end">
            <select
              :value="props.item.quantity"
              class="input-form input-form--select m-0 min-h-0 max-w-14 border-0 bg-[right_2px_center] pb-0 pl-0 pr-4 pt-0 text-right text-xs ring-transparent focus-visible:ring-2 focus-visible:ring-primary"
              @change="handleUpdateQty"
            >
              <option v-for="n in 100" :key="'qty-' + n" :value="n">
                {{ n }}
              </option>
            </select>
          </div>
          <p v-if="salePrice" class="ml-5 w-22 text-right text-xs">
            {{ formatToUsd(salePrice) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-shrink-0 items-center overflow-hidden">
      <button type="button" @click.prevent="handleDelete">
        <svg
          class="h-4 w-4 text-red-500"
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
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </button>
    </div>
  </li>
</template>
