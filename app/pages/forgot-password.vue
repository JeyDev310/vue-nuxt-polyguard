<script lang="ts" setup>
import { definePageMeta } from '#imports'

import PasswordResetRequest from '~/components/auth/PasswordResetRequest.vue'

definePageMeta({
  middleware: ['guests-only'],
})
</script>

<template>
  <main class="mb-22 mt-48 lg:mt-60">
    <div class="flex min-h-[65vh] items-center justify-center">
      <div class="w-fit min-w-[30rem] rounded-lg bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Forgot Password</h1>
        <p class="mb-6 text-sm">
          Enter your email to receive a password reset link
        </p>
        <PasswordResetRequest />
      </div>
    </div>
  </main>
</template>
