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
  (event: 'registered'): void
}

const emit = defineEmits<Emits>()

const formFeedback = useFormFeedback()
const bigCommerceAuth = useBigCommerceAuth()
const bigCommerceCart = useBigCommerceCart()

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>()
const password = ref<string>()
const company = ref<string>()
const phone = ref<string>()

const paramsSchema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .email({ message: 'Email is invalid!' }),
  password: z.string({ required_error: 'Password is required!' }).min(8, {
    message: 'Password must be at least 8 characters long!',
  }),
  firstName: z.string({ required_error: 'First Name is required!' }).min(3, {
    message: 'First Name must be at least 3 characters long!',
  }),
  lastName: z.string({ required_error: 'Last Name is required!' }).min(3, {
    message: 'Last Name must be at least 3 characters long!',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
})

async function handleSubmit(): Promise<void> {
  try {
    formFeedback.reset()

    const params = paramsSchema.parse({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      company: company.value,
      phone: phone.value,
    })

    await bigCommerceAuth.register({
      ...params,
    })

    // reloads the cart to update the customerId
    await bigCommerceCart.getCurrentCart()

    formFeedback.addFlashMessage('success', 'Registered successfully!')
    emit('registered')
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
    <div class="my-6 flex flex-col gap-4 lg:mt-8 lg:gap-6">
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
      <div>
        <label for="firstName" class="text-sm font-medium text-gray-700"
          >First name</label
        >
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          name="firstName"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label for="lastName" class="text-sm font-medium text-gray-700"
          >Last name</label
        >
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          name="lastName"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter last name"
        />
      </div>
      <div>
        <label for="company" class="text-sm font-medium text-gray-700"
          >Company</label
        >
        <input
          id="company"
          v-model="company"
          type="text"
          name="company"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label for="phone" class="text-sm font-medium text-gray-700"
          >Phone</label
        >
        <input
          id="phone"
          v-model="phone"
          type="tel"
          name="phone"
          class="block w-full rounded border border-gray-300 p-2 text-sm placeholder:text-gray-400"
          placeholder="Enter phone"
        />
      </div>
    </div>
    <button
      type="submit"
      class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
    >
      Create account
    </button>
  </form>
</template>
