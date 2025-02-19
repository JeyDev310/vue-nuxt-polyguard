<script lang="ts" setup>
import { definePageMeta } from '#imports'

import PasswordResetForm from '~/components/auth/PasswordResetForm.vue'

definePageMeta({
  middleware: ['guests-only'],
})
</script>

<template>
  <main class="mb-22 mt-48 lg:mt-60">
    <div class="flex min-h-[65vh] items-center justify-center">
      <div class="mt-8 w-fit min-w-[30rem] rounded-lg bg-white p-6 shadow-md">
        <h1 class="mb-4 text-2xl font-bold">Reset Password</h1>
        <p class="mb-4">Enter your new password</p>
        <PasswordResetForm />
      </div>
    </div>
  </main>
</template>
