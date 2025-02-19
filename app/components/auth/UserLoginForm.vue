<script setup lang="ts">
import { z } from 'zod'
import {
  navigateTo,
  ref,
  useFormFeedback,
  useBigCommerceAuth,
  useBigCommerceCart,
} from '#imports'

import ErrorMessages from '~/components/forms/ErrorMessages.vue'

interface Props {
  redirectPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  redirectPath: '/',
})

interface Emits {
  (event: 'logged-in'): void
}

const emit = defineEmits<Emits>()

const bigCommerceAuth = useBigCommerceAuth()
const bigCommerceCart = useBigCommerceCart()
const formFeedback = useFormFeedback()

const email = ref<string>()
const password = ref<string>()

const paramsSchema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .email({ message: 'Email is invalid!' }),
  password: z.string({ required_error: 'Password is required!' }),
})

async function handleSubmit(): Promise<void> {
  try {
    formFeedback.reset()

    const parsedParams = paramsSchema.parse({
      email: email.value,
      password: password.value,
    })

    await bigCommerceAuth.login({
      email: parsedParams.email,
      password: parsedParams.password,
    })

    // reloads the cart to update the customerId
    await bigCommerceCart.getCurrentCart()

    emit('logged-in')
    if (props.redirectPath) {
      await navigateTo(props.redirectPath)
    }
  } catch (error) {
    formFeedback.handleError(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <ErrorMessages :errors="formFeedback.errors.value" />
    <div class="my-6 flex flex-col gap-4 lg:my-8 lg:gap-6">
      <div class="">
        <label for="email" class="text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter email address"
        />
      </div>
      <div>
        <label for="password" class="text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter password"
        />
      </div>
      <div class="flex flex-row items-center justify-between">
        <div class="flex gap-3">
          <div class="flex h-6 shrink-0 items-center">
            <div class="group grid size-4 grid-cols-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  class="opacity-0 group-has-[:checked]:opacity-100"
                  d="M3 8L6 11L11 3.5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="opacity-0 group-has-[:indeterminate]:opacity-100"
                  d="M3 7H11"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <label for="remember-me" class="block text-sm/6 text-gray-900"
            >Remember me</label
          >
        </div>
        <NuxtLink
          to="/forgot-password"
          class="text-sm text-primary-dark hover:text-primary"
          >Forgot password?</NuxtLink
        >
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
      >
        Sign in
      </button>
    </div>
  </form>
</template>
