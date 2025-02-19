<script setup lang="ts">
import type { CustomerAddress } from '#shared/types'
import { ref, useFlashMessagesStore } from '#imports'
import ConfirmModal from '~/components/ui/ConfirmModal.vue'

interface Props {
  addresses: CustomerAddress[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'edit' | 'delete', addressId: number): void
  (e: 'new'): void
}

const emit = defineEmits<Emits>()

const flashMessagesStore = useFlashMessagesStore()

const showDeleteModal = ref(false)
const addressToDelete = ref<number | null>(null)

function handleDeleteClick(addressId: number) {
  addressToDelete.value = addressId
  showDeleteModal.value = true
}

async function handleConfirmDelete() {
  const addressId = addressToDelete.value
  if (!addressId) return

  try {
    await $fetch(`/api/v1/customer/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addressId: addressToDelete.value }),
    })

    flashMessagesStore.setSuccessMessage('Address deleted successfully')
    emit('delete', addressId)
  } catch (error) {
    flashMessagesStore.setDangerMessage('Failed to delete address')
    console.error('Failed to delete address:', error)
  }
}
</script>

<template>
  <div class="w-full max-w-prose">
    <div class="mb-10">
      <!-- Fancy Prose -->
      <div class="prose--fancy prose text-center">
        <h3><strong>Addresses</strong></h3>
      </div>
    </div>

    <div class="my-10">
      <ul class="grid gap-5">
        <li v-for="address in props.addresses" :key="address.id">
          <div
            class="flex flex-col items-center justify-between gap-5 rounded-md bg-tertiary-lightest py-10 md:flex-row md:py-3"
          >
            <div>
              <div class="px-5 text-center text-sm leading-6 md:text-left">
                <div>{{ address.first_name }} {{ address.last_name }}</div>
                <div class="text-tertiary">
                  <div>{{ address.address1 }}</div>
                  <div v-if="address.address2">{{ address.address2 }}</div>
                  <div>
                    {{ address.city }}, {{ address.state_or_province }}
                    {{ address.postal_code }}
                  </div>
                  <div>{{ address.country }}</div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center gap-3 px-4">
              <button
                class="button button--secondary"
                @click="emit('edit', address.id)"
              >
                Edit
              </button>
              <button
                class="button button--dark"
                @click="handleDeleteClick(address.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div
        class="mt-10 flex items-center justify-center rounded-md bg-tertiary-lightest px-6 py-8"
      >
        <button class="button button--tertiary" @click="emit('new')">
          Add New Address
        </button>
      </div>
    </div>
  </div>

  <ConfirmModal
    v-model:is-open="showDeleteModal"
    title="Delete Address"
    message="Are you sure you want to delete this address?"
    @confirm="handleConfirmDelete"
  />
</template>

<style lang="scss" scoped>
.button {
  @apply rounded-md px-3 py-1 text-sm transition-colors duration-200;
}

.button--secondary {
  @apply bg-primary-dark text-white hover:bg-primary-darker;
}

.button--dark {
  @apply bg-gray-700 text-white hover:bg-gray-900;
}

.button--tertiary {
  // @apply hover:bg-tertiary-darker
  @apply bg-tertiary-dark text-white;
}
</style>
