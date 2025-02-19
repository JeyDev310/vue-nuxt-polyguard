<script setup lang="ts">
import { FetchError } from 'ofetch'
import { ref, onMounted, useRoute, useRouter } from '#imports'

// interface ApiError {
//   message: string
//   statusCode?: number
// }

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showForm = ref(false)

// Password validation rules
const passwordRules = {
  minLength: 8,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*]/,
}

const validatePassword = (password: string): string[] => {
  const errors: string[] = []

  if (password.length < passwordRules.minLength) {
    errors.push(
      `Password must be at least ${passwordRules.minLength} characters long`,
    )
  }
  if (!passwordRules.hasUpperCase.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!passwordRules.hasLowerCase.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!passwordRules.hasNumber.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!passwordRules.hasSpecialChar.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return errors
}

onMounted(() => {
  const token = route.query.token as string
  if (!token) {
    errorMessage.value =
      'No reset token provided. Please check your reset password link.'
    return
  }
  showForm.value = true
})

async function resetPassword() {
  errorMessage.value = ''
  successMessage.value = ''

  // Validate passwords match
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // Validate password strength
  const passwordErrors = validatePassword(newPassword.value)
  if (passwordErrors.length > 0) {
    errorMessage.value = passwordErrors.join('\n')
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/v1/customer/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: route.query.token,
        newPassword: newPassword.value,
      }),
    })

    successMessage.value = response.message ?? 'Password successfully reset'

    // Clear form
    newPassword.value = ''
    confirmPassword.value = ''

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('Error resetting password:', error)

    if (error instanceof FetchError) {
      errorMessage.value =
        error.data?.message ??
        'An unexpected error occurred while resetting your password'
      return
    }
    errorMessage.value =
      'An unexpected error occurred while resetting your password'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- Error Message Panel -->
    <div
      v-if="errorMessage"
      class="rounded-lg bg-red-50 p-4 text-red-700"
      role="alert"
    >
      <div class="font-medium">Error</div>
      <div class="mt-1 whitespace-pre-line">{{ errorMessage }}</div>
    </div>

    <!-- Success Message Panel -->
    <div
      v-if="successMessage"
      class="rounded-lg bg-green-50 p-4 text-green-700"
      role="alert"
    >
      <div class="font-medium">Success</div>
      <div class="mt-1">{{ successMessage }}</div>
    </div>

    <!-- Password Reset Form -->
    <form
      v-if="showForm"
      class="space-y-4 rounded-lg border p-6 shadow-sm"
      @submit.prevent="resetPassword"
    >
      <div class="space-y-2">
        <label
          for="new-password"
          class="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          required
          placeholder="Enter new password"
          :disabled="isLoading"
          class="w-full rounded border p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div class="space-y-2">
        <label
          for="confirm-password"
          class="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm new password"
          :disabled="isLoading"
          class="w-full rounded border p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
      >
        <span v-if="isLoading">Resetting...</span>
        <span v-else>Reset Password</span>
      </button>
    </form>
  </div>
</template>
