<script setup lang="ts">
import { onMounted, ref } from '#imports'
import OrdersList from '~/components/customer/orders-history/OrdersList.vue'
import OrderDetails from '~/components/customer/orders-history/OrderDetails.vue'

import type { GetCustomerOrdersResponse } from '#shared/types'

onMounted(() => {
  fetchOrders().then()
})

const resp = ref<GetCustomerOrdersResponse>()

const error = ref<string>()

const orderId = ref<number | null>(null)
// const notice = ref<string | null>(null)
// const error = ref<string | null>(null)

const orders = computed(() => {
  return resp.value ?? []
})

function resetView() {
  orderId.value = null
}

// Fetch orders on component mount
async function fetchOrders() {
  try {
    resp.value = await $fetch('/api/v1/customer/orders')
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>

<template>
  <div class="w-full max-w-prose">
    <template v-if="orderId">
      <OrderDetails :order-id="orderId" @back="resetView" />
    </template>
    <template v-else>
      <OrdersList :orders="orders" @view-order="(id) => (orderId = id)" />
    </template>
  </div>
</template>
