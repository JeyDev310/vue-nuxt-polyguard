<script setup lang="ts">
import { ref, onMounted, watch, useFlashMessagesStore } from '#imports'

import type {
  CustomerAddress,
  StoreCountry,
  StoreCountryState,
} from '#shared/types'

interface Props {
  addressId: number | null
  isNew: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'cancel' | 'saved'): void
}

const emit = defineEmits<Emits>()

const flashMessagesStore = useFlashMessagesStore()

type CustomerAddressFormData = Omit<
  CustomerAddress,
  'id' | 'customer_id' | 'address_type' | 'country'
>

const customerAddress = ref<CustomerAddressFormData>({
  first_name: '',
  last_name: '',
  company: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state_or_province: '',
  postal_code: '',
  country_code: '',
})

const storeCountries = ref<Array<StoreCountry>>([])
const storeCountryStates = ref<Array<StoreCountryState>>([])

const countries = computed(() => {
  return storeCountries.value.map((country) => ({
    name: country.country,
    code: country.country_iso2,
  }))
})

const states = computed(() => {
  return storeCountryStates.value.map((state) => state.state)
})

function handleChangeCountry(e: Event) {
  const _target = e.target
  if (!(_target instanceof HTMLSelectElement)) {
    return
  }

  const selectedCountry = storeCountries.value.find(
    (country) => country.country_iso2 === _target.value,
  )

  selectedCountryId.value = selectedCountry?.id
}

const selectedCountryId = ref<number>()

const error = ref<string | null>(null)

onMounted(async () => {
  await fetchAddress()
  fetchCountries().then(() => {
    if (customerAddress.value.country_code) {
      const selectedCountry = storeCountries.value.find(
        (country) =>
          country.country_iso2 === customerAddress.value.country_code,
      )

      const _selectedCountryId = selectedCountry?.id
      if (!_selectedCountryId) {
        return
      }

      selectedCountryId.value = _selectedCountryId
      fetchCountryStates(_selectedCountryId)
    }
  })
})

watch(
  () => selectedCountryId.value,
  (newVal) => {
    if (newVal) {
      fetchCountryStates(newVal)
    }
  },
)

async function fetchAddress() {
  if (!props.addressId) {
    return
  }

  try {
    customerAddress.value = await $fetch(
      `/api/v1/customer/addresses/${props.addressId}`,
    )
  } catch (err) {
    error.value = (err as Error).message
  }
}

async function fetchCountries() {
  try {
    storeCountries.value = await $fetch('/api/v1/store/countries')
  } catch (err) {
    error.value = (err as Error).message
  }
}

async function fetchCountryStates(countryId: number) {
  try {
    storeCountryStates.value = await $fetch(
      `/api/v1/store/countries/${countryId}/states`,
    )
  } catch (err) {
    error.value = (err as Error).message
  }
}

async function saveAddress() {
  try {
    if (props.addressId) {
      customerAddress.value = await $fetch(
        `/api/v1/customer/addresses/${props.addressId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            addressId: props.addressId,
            ...customerAddress.value,
          }),
        },
      )

      flashMessagesStore.setSuccessMessage('Address updated successfully')
    } else {
      customerAddress.value = await $fetch('/api/v1/customer/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerAddress.value),
      })

      flashMessagesStore.setSuccessMessage('Address added successfully')
    }

    emit('saved')
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>

<template>
  <div class="w-full max-w-prose">
    <div class="mb-10">
      <!-- Fancy Prose -->
      <div class="prose--fancy prose text-center">
        <h3>
          <strong>{{ isNew ? 'Add New' : 'Edit' }} Address</strong>
        </h3>
      </div>
    </div>

    <div class="my-10">
      <form class="grid gap-6" @submit.prevent="saveAddress">
        <div v-if="error" class="text-center text-red-500">{{ error }}</div>

        <div class="grid gap-x-7 gap-y-6 sm:grid-cols-2">
          <!-- First Name -->
          <div class="input-wrap">
            <label for="first-name" class="mb-2 block"
              >First Name<span class="text-red-500">*</span></label
            >
            <input
              id="first-name"
              v-model="customerAddress.first_name"
              type="text"
              required
              class="input-form"
              placeholder="First Name"
            />
          </div>

          <!-- Last Name -->
          <div class="input-wrap">
            <label for="last-name" class="mb-2 block"
              >Last Name<span class="text-red-500">*</span></label
            >
            <input
              id="last-name"
              v-model="customerAddress.last_name"
              type="text"
              required
              class="input-form"
              placeholder="Last Name"
            />
          </div>

          <!-- Company -->
          <div class="input-wrap">
            <label for="company" class="mb-2 block">Company</label>
            <input
              id="company"
              v-model="customerAddress.company"
              type="text"
              class="input-form"
              placeholder="Company Name"
            />
          </div>

          <!-- Phone -->
          <div class="input-wrap">
            <label for="phone" class="mb-2 block">Phone</label>
            <input
              id="phone"
              v-model="customerAddress.phone"
              type="tel"
              class="input-form"
              placeholder="Phone Number"
            />
          </div>

          <!-- Address Line 1 -->
          <div class="input-wrap sm:col-span-2">
            <label for="address1" class="mb-2 block"
              >Address Line 1<span class="text-red-500">*</span></label
            >
            <input
              id="address1"
              v-model="customerAddress.address1"
              type="text"
              required
              class="input-form"
              placeholder="Street Address"
            />
          </div>

          <!-- Address Line 2 -->
          <div class="input-wrap sm:col-span-2">
            <label for="address2" class="mb-2 block">Address Line 2</label>
            <input
              id="address2"
              v-model="customerAddress.address2"
              type="text"
              class="input-form"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <!-- City -->
          <div class="input-wrap">
            <label for="city" class="mb-2 block"
              >City<span class="text-red-500">*</span></label
            >
            <input
              id="city"
              v-model="customerAddress.city"
              type="text"
              required
              class="input-form"
              placeholder="City"
            />
          </div>

          <!-- State -->
          <div class="input-wrap">
            <label for="state" class="mb-2 block"
              >State<span class="text-red-500">*</span></label
            >
            <select
              id="state"
              v-model="customerAddress.state_or_province"
              required
              class="input-form"
            >
              <option value="">Select State</option>
              <option v-for="state in states" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
          </div>

          <!-- Postal Code -->
          <div class="input-wrap">
            <label for="postal-code" class="mb-2 block"
              >Postal Code<span class="text-red-500">*</span></label
            >
            <input
              id="postal-code"
              v-model="customerAddress.postal_code"
              type="text"
              required
              class="input-form"
              placeholder="Postal Code"
            />
          </div>

          <!-- Country -->
          <div class="input-wrap">
            <label for="country" class="mb-2 block"
              >Country<span class="text-red-500">*</span></label
            >
            <select
              id="country"
              v-model="customerAddress.country_code"
              required
              class="input-form"
              @change="handleChangeCountry"
            >
              <option value="">Select Country</option>
              <option
                v-for="country in countries"
                :key="country.code"
                :value="country.code"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex justify-end gap-4">
          <button
            type="button"
            class="button button--tertiary"
            @click="emit('cancel')"
          >
            Cancel
          </button>
          <button type="submit" class="button button--secondary">
            {{ isNew ? 'Add' : 'Save' }} Address
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrap {
  label {
    @apply text-sm;
  }
}

.input-form {
  @apply w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light;
}

.button {
  @apply rounded-md px-6 py-2 transition-colors duration-200;
}

.button--secondary {
  @apply bg-primary-dark text-white hover:bg-primary-darker;
}

.button--tertiary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}
</style>
