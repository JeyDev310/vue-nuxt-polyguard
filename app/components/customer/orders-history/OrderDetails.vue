<script setup lang="ts">
import { ref, onMounted } from '#imports'
import type { CustomerOrder } from '#shared/types'

interface Props {
  orderId: number
}

const props = defineProps<Props>()

interface Emits {
  (e: 'back'): void
}

const emit = defineEmits<Emits>()

const orderDetails = ref<CustomerOrder>()
const error = ref<string>()

onMounted(async () => {
  try {
    orderDetails.value = await $fetch(
      `/api/v1/customer/orders/${props.orderId}`,
    )
  } catch (err) {
    error.value = (err as Error).message
  }
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })
}

function printInvoice() {
  window.print()
}
</script>

<template>
  <div class="w-full max-w-prose">
    <div v-if="orderDetails">
      <div class="flex-1 bg-white py-16 pl-6 pr-6 lg:py-24 lg:pl-20">
        <div class="checkout-order-summary lg:max-w-[750px]">
          <!-- Order Header -->
          <table class="mb-10 w-full">
            <tbody>
              <tr class="space-y-10 sm:space-y-0">
                <td class="block text-center sm:table-cell">
                  <h3 class="print:text-xl">
                    <strong>Order #{{ orderDetails.id }}</strong>
                  </h3>
                  <div class="text-xs font-medium text-tertiary/50">
                    {{ formatDate(orderDetails.date_created) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Shipping and Billing -->
          <table class="mb-10 mt-10 w-full sm:mb-16 print:mb-5">
            <tbody>
              <tr class="space-y-10 sm:space-y-0">
                <!-- Shipping Address -->
                <td
                  v-if="orderDetails.shipping_addresses[0]"
                  class="block sm:table-cell print:table-cell"
                >
                  <div class="grid gap-3">
                    <div
                      class="text-center font-heading font-bold sm:text-left print:text-left"
                    >
                      Ship To
                    </div>
                    <div
                      class="text-center text-sm leading-6 sm:text-left print:text-left"
                    >
                      <div>
                        {{ orderDetails.shipping_addresses[0].first_name }}
                        {{ orderDetails.shipping_addresses[0].last_name }}
                      </div>
                      <div class="text-tertiary">
                        <div>
                          {{ orderDetails.shipping_addresses[0].street_1 }}
                        </div>
                        <div v-if="orderDetails.shipping_addresses[0].street_2">
                          {{ orderDetails.shipping_addresses[0].street_2 }}
                        </div>
                        <div>
                          {{ orderDetails.shipping_addresses[0].city }},
                          {{ orderDetails.shipping_addresses[0].state }}
                          {{ orderDetails.shipping_addresses[0].zip }}
                        </div>
                        <div>
                          {{ orderDetails.shipping_addresses[0].country }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Billing Address -->
                <td class="block sm:table-cell print:table-cell">
                  <div class="grid gap-3">
                    <div
                      class="text-center font-heading font-bold sm:text-left print:text-left"
                    >
                      Bill To
                    </div>
                    <div
                      class="text-center text-sm leading-6 sm:text-left print:text-left"
                    >
                      <div>
                        {{ orderDetails.billing_address.first_name }}
                        {{ orderDetails.billing_address.last_name }}
                      </div>
                      <div class="text-tertiary">
                        <div>
                          {{ orderDetails.billing_address.street_1 }}
                        </div>
                        <div v-if="orderDetails.billing_address.street_2">
                          {{ orderDetails.billing_address.street_2 }}
                        </div>
                        <div>
                          {{ orderDetails.billing_address.city }},
                          {{ orderDetails.billing_address.state }}
                          {{ orderDetails.billing_address.zip }}
                        </div>
                        <div>
                          {{ orderDetails.billing_address.country }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Products Table -->
          <table
            class="w-full table-fixed [&_.price]:text-right [&_.qty]:text-center [&_.th-price]:min-w-24 [&_.th-qty]:min-w-10 sm:[&_.th-qty]:min-w-24 [&_thead_th]:border-b-2 [&_thead_th]:border-tertiary-light/30 [&_thead_th]:py-3.5 [&_tr_td]:border-b-2 [&_tr_td]:border-tertiary-light/30 [&_tr_td]:py-3.5"
          >
            <thead class="text-left text-xs font-medium">
              <tr>
                <th>Item</th>
                <th class="th-qty qty">Quantity</th>
                <th class="th-price price">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in orderDetails.products" :key="product.sku">
                <td>
                  <div class="grid gap-2">
                    <div class="text-sm font-bold text-primary">
                      {{ product.name }}
                    </div>
                    <p class="text-xs text-tertiary sm:text-base">
                      {{ product.sku }}
                    </p>
                  </div>
                </td>
                <td class="qty">
                  <div class="font-medium text-primary">
                    {{ product.quantity }}
                  </div>
                </td>
                <td class="price">
                  <div class="font-medium">${{ product.price_ex_tax }}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Order Summary -->
          <table
            class="ml-auto w-full max-w-96 table-fixed [&_.amount]:text-right [&_tr:not(:last-child)_td]:border-b-2 [&_tr_td]:border-tertiary-light/30 [&_tr_td]:py-3.5"
          >
            <tbody>
              <tr class="text-sm">
                <td>
                  <div>Subtotal</div>
                </td>
                <td class="subtotal amount">
                  <div>${{ orderDetails.subtotal_ex_tax }}</div>
                </td>
              </tr>
              <tr class="text-sm">
                <td>
                  <div>Tax</div>
                </td>
                <td class="tax amount">
                  <div>${{ orderDetails.subtotal_tax }}</div>
                </td>
              </tr>
              <tr class="text-sm">
                <td>
                  <div>Shipping</div>
                </td>
                <td class="shipping amount">
                  <div>${{ orderDetails.shipping_cost_inc_tax }}</div>
                </td>
              </tr>
              <tr
                v-if="parseFloat(orderDetails.discount_amount) > 0"
                class="text-sm"
              >
                <td>
                  <div>Discount</div>
                </td>
                <td class="discount amount">
                  <div>${{ orderDetails.discount_amount }}</div>
                </td>
              </tr>
              <tr class="text-lg">
                <td>
                  <div>Total</div>
                </td>
                <td class="total amount">
                  <div class="font-bold">${{ orderDetails.total_inc_tax }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Actions -->
        <div class="my-10 print:hidden">
          <div
            class="flex flex-wrap items-center justify-center gap-4 sm:justify-end"
          >
            <button
              type="button"
              class="button button--bold button--secondary tracking-widest"
              @click="printInvoice"
            >
              Print Invoice
            </button>
            <button
              type="button"
              class="button button--bold button--tertiary tracking-widest"
              @click="emit('back')"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <div v-else class="text-center">Loading order details...</div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  @apply rounded-md px-3 py-1 text-sm transition-colors duration-200;
}

.button--secondary {
  @apply bg-primary-dark text-white hover:bg-primary-darker;
}

.button--dark {
  @apply bg-gray-800 text-white hover:bg-gray-900;
}

.button--tertiary {
  // @apply hover:bg-tertiary-darker;
  @apply bg-tertiary-dark text-white;
}

.button--bold {
  @apply font-semibold;
}
</style>
