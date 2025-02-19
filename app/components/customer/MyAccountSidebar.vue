<script lang="ts" setup></script>

<template>
  <aside>
    <div class="mb-0 md:mb-10">
      <h2 class="mb-2 text-xl font-semibold text-gray-800">My Account</h2>
      <hr class="border-gray-300" />
    </div>
    <nav
      class="flex flex-row flex-wrap items-end space-x-3 space-y-6 text-sm md:flex-col"
    >
      <NuxtLink to="/my-account" class="link">Account Information</NuxtLink>
      <NuxtLink to="/my-account/addresses" class="link">Addresses</NuxtLink>
      <NuxtLink to="/my-account/orders" class="link">Orders</NuxtLink>
      <NuxtLink to="/my-account/logout" class="link">Logout</NuxtLink>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.link {
  @apply text-gray-600;
  @apply hover:text-primary;
  @apply px-4 py-1;
  @apply rounded-full;
  @apply border border-gray-300;
  @apply w-fit;
  @apply text-sm;
  @apply bg-gray-200;
  &:hover {
    @apply bg-gray-300;
  }

  &:first-child {
    @apply ml-3;
  }
}

.router-link-active,
.router-link-exact-active {
  @apply bg-primary;
  @apply border-primary;
  @apply text-white;
  &:hover {
    @apply bg-primary-darker;
    @apply text-white;
  }
}
</style>
