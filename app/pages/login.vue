<script lang="ts" setup>
import { definePageMeta } from '#imports'

import UserLoginForm from '~/components/auth/UserLoginForm.vue'

definePageMeta({
  middleware: ['guests-only'],
})
</script>

<template>
  <main class="mb-22 mt-48 lg:mt-60">
    <div class="flex min-h-[65vh] items-center justify-center">
      <div class="w-fit min-w-[30rem] rounded-lg bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Sign in to your account</h1>
        <p class="mb-6 text-sm">
          <span class="mr-1">Not registered yet?</span>
          <NuxtLink to="/register" class="text-primary-dark hover:text-primary"
            >Create an account</NuxtLink
          >
        </p>
        <UserLoginForm />
      </div>
    </div>
  </main>
</template>
