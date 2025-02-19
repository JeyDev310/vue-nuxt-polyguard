<script lang="ts" setup>
import { useBigCommerceAuth, navigateTo, useBigCommerceCart } from '#imports'

const bigCommerceAuth = useBigCommerceAuth()
const bigCommerceCart = useBigCommerceCart()

async function handleSubmit(): Promise<void> {
  await bigCommerceAuth.logout()
  bigCommerceCart.resetCart()
  await navigateTo('/')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Logout
      </button>
    </div>
  </form>
</template>
