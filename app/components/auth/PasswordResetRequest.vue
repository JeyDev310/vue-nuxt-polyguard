<script setup lang="ts">
import { FetchError } from 'ofetch'
import { ref } from '#imports'

const email = ref<string>('')
const message = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

async function requestReset() {
  message.value = null
  errorMessage.value = null
  try {
    const response = await $fetch('/api/v1/customer/password-request', {
      method: 'POST',
      body: { email: email.value },
    })
    message.value = response.message
  } catch (error) {
    if (error instanceof FetchError) {
      errorMessage.value =
        error.data?.message || 'Error requesting password reset'
      return
    }
    errorMessage.value = 'Error requesting password reset'
  }
}
</script>

<template>
  <form
    class="mx-auto max-w-md space-y-6 rounded-lg"
    @submit.prevent="requestReset"
  >
    <input
      v-model="email"
      type="email"
      required
      placeholder="Enter your email"
      class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
    />
    <button
      type="submit"
      class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
    >
      Request Password Reset
    </button>

    <div v-if="message" class="mt-4 rounded bg-green-100 p-4 text-green-700">
      {{ message }}
    </div>
    <div v-if="errorMessage" class="mt-4 rounded bg-red-100 p-4 text-red-700">
      {{ errorMessage }}
    </div>
  </form>
</template>
