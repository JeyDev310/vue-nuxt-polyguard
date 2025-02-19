<script setup lang="ts">
import { ref, onMounted } from '#imports'
import type { GetCustomerAddressesResponse } from '#shared/types'
import AddressList from './addresses/AddressesList.vue'
import AddressEdit from './addresses/AddressEdit.vue'

onMounted(() => {
  fetchAddresses()
})

const resp = ref<GetCustomerAddressesResponse>()

const editingAddressId = ref<number | null>(null)
const newAddress = ref(false)

// const notice = ref<string | null>(null)
const error = ref<string | null>(null)

const addresses = computed(() => {
  return resp.value?.data ?? []
})

// Fetch addresses on component mount
async function fetchAddresses() {
  try {
    resp.value = await $fetch('/api/v1/customer/addresses')
  } catch (err) {
    error.value = (err as Error).message
  }
}

function startNewAddress() {
  newAddress.value = true
  editingAddressId.value = null
}

function startEditAddress(addressId: number) {
  editingAddressId.value = addressId
  newAddress.value = false
}

function resetEdit() {
  editingAddressId.value = null
  newAddress.value = false
}

function handleSavedOrDeletedAddress() {
  resetEdit()
  fetchAddresses()
}
</script>

<template>
  <div class="w-full max-w-prose">
    <template v-if="editingAddressId || newAddress">
      <AddressEdit
        :address-id="editingAddressId"
        :is-new="newAddress"
        @cancel="resetEdit"
        @saved="handleSavedOrDeletedAddress"
      />
    </template>
    <template v-else>
      <AddressList
        :addresses="addresses"
        @edit="startEditAddress"
        @new="startNewAddress"
        @delete="handleSavedOrDeletedAddress"
      />
    </template>
  </div>
</template>
