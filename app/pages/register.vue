<script lang="ts" setup>
import { definePageMeta } from '#imports'

import UserRegisterForm from '~/components/auth/UserRegisterForm.vue'

definePageMeta({
  middleware: ['guests-only'],
})
</script>

<template>
  <main class="mb-22 mt-48 lg:mt-60">
    <div class="flex min-h-[65vh] items-center justify-center">
      <div class="w-fit min-w-[30rem] rounded-lg bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Create a new account</h1>
        <p class="mb-6 text-sm">
          <span class="mr-1">Are you already registered?</span>
          <NuxtLink to="/login" class="text-primary-dark hover:text-primary"
            >Sign in to your account</NuxtLink
          >
        </p>
        <UserRegisterForm />
      </div>
    </div>
  </main>
</template>
