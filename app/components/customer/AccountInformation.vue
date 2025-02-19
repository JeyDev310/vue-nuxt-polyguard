<script setup lang="ts">
import { ref, onMounted } from '#imports'
import type { GetCurrentCustomerResponse } from '#shared/types'

onMounted(() => {
  fetchProfile()
})

// This will need to be replaced with your actual API call
const customer = ref<GetCurrentCustomerResponse>()

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  newPassword: string
  confirmPassword: string
}

const formData = ref<Partial<FormData>>({
  firstName: customer.value?.firstName,
  lastName: customer.value?.lastName,
  email: customer.value?.email,
  phone: customer.value?.phone,
  company: customer.value?.company,
})

const errors = ref<string[]>([])
const success = ref<string>('')

async function fetchProfile() {
  try {
    customer.value = await $fetch('/api/v1/customer/current')
    formData.value = {
      firstName: customer.value?.firstName,
      lastName: customer.value?.lastName,
      email: customer.value?.email,
      phone: customer.value?.phone,
      company: customer.value?.company,
    }
  } catch (error) {
    errors.value = [(error as Error).message]
  }
}

async function saveProfile() {
  const customerId = customer.value?.entityId
  if (!customerId) {
    throw new Error('Customer ID not found')
  }

  try {
    customer.value = await $fetch(`/api/v1/customer/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    formData.value = {
      firstName: customer.value?.firstName,
      lastName: customer.value?.lastName,
      email: customer.value?.email,
      phone: customer.value?.phone,
      company: customer.value?.company,
    }
  } catch (error) {
    errors.value = [(error as Error).message]
    success.value = ''
  }

  success.value = 'Profile updated successfully'
  errors.value = []
}
</script>

<template>
  <div class="w-full max-w-prose">
    <div class="mb-10">
      <!-- Fancy Prose -->
      <div class="prose--fancy prose text-center">
        <h3><strong>Account</strong> Information</h3>
      </div>
    </div>

    <div class="my-10">
      <form @submit.prevent="saveProfile">
        <!-- Error/Success Messages -->
        <div v-if="errors.length > 0" class="error-message mb-4">
          <p v-for="error in errors" :key="error" class="text-red-500">
            {{ error }}
          </p>
        </div>
        <div v-if="success" class="success-message mb-4">
          <p class="text-green-500">{{ success }}</p>
        </div>

        <div class="grid gap-x-7 gap-y-6 sm:grid-cols-2">
          <div class="input-wrap">
            <div>
              <label class="" for="firstName">First Name<span>*</span></label>
            </div>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              placeholder="First Name"
              class="input-form input-form--text"
            />
          </div>

          <div class="input-wrap">
            <div>
              <label class="" for="lastName">Last Name</label>
            </div>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Your Last Name"
              class="input-form input-form--text"
            />
          </div>
          <div class="sm:col-span-2">
            <div class="input-wrap">
              <div>
                <label class="" for="email">Email Address</label>
              </div>
              <input
                id="email"
                :value="formData.email"
                disabled
                type="email"
                placeholder="name@domain.com"
                class="input-form input-form--text bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          <div class="input-wrap">
            <div>
              <label class="" for="phone">Phone</label>
            </div>
            <input
              id="phone"
              v-model="formData.phone"
              type="text"
              placeholder="000-000-0000"
              class="input-form input-form--text"
            />
          </div>

          <div class="input-wrap">
            <div>
              <label class="" for="company">Company Name</label>
            </div>
            <input
              id="company"
              v-model="formData.company"
              type="text"
              placeholder="Your Company"
              class="input-form input-form--text"
            />
          </div>
          <div class="sm:col-span-2">
            <hr class="mb-4 mt-3 w-full border-t-2 border-tertiary-light/30" />
          </div>

          <div class="input-wrap">
            <div>
              <label class="" for="newPassword"
                >New Password<span>*</span></label
              >
            </div>
            <input
              id="newPassword"
              v-model="formData.newPassword"
              type="password"
              class="input-form input-form--text"
            />
          </div>

          <div class="input-wrap">
            <div>
              <label class="" for="confirmPassword">New Password Confirm</label>
            </div>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              class="input-form input-form--text"
            />
          </div>

          <div class="sm:col-span-2">
            <div class="button-form-group flex justify-end">
              <button type="submit" class="button button--secondary">
                Save Account Information
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-form {
  @apply w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300;
}

.button--secondary {
  @apply rounded-md bg-primary-dark px-6 py-2 text-white transition-colors duration-200 hover:bg-primary-darker;
}

.input-wrap {
  label {
    @apply text-gray-800;
    @apply text-sm;
  }
}
</style>
