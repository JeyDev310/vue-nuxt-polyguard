<script setup lang="ts">
import type { CustomerOrder } from '#shared/types'

interface Props {
  orders: CustomerOrder[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'view-order', orderId: number): void
}

const emit = defineEmits<Emits>()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })
}
</script>

<template>
  <div class="w-full max-w-prose">
    <div class="mb-10">
      <!-- Fancy Prose -->
      <div class="prose--fancy prose text-center">
        <h3><strong>Order</strong> History</h3>
      </div>
    </div>

    <div class="my-10">
      <ul class="grid gap-5">
        <li v-for="order in props.orders" :key="order.id">
          <div
            class="flex flex-col items-center justify-between gap-5 rounded-md bg-tertiary-lightest py-3 md:flex-row"
          >
            <div>
              <div
                class="flex flex-col items-center px-5 text-sm md:flex-row md:gap-4"
              >
                <div>Order #{{ order.id }}</div>
                <div class="text-tertiary">
                  {{ formatDate(order.date_created) }}
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center px-4">
              <button
                class="button button--secondary"
                @click="emit('view-order', order.id)"
              >
                Order Details
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button--secondary {
  @apply rounded-md bg-primary-dark px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-primary-darker;
}
</style>
