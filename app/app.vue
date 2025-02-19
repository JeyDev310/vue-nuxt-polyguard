<script setup lang="ts">
import FlashMessages from '~/components/common/FlashMessages.vue'
</script>

<template>
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right, #f6f6f6 0%, #348df2 100%)"
    error-color="#ce0d2e"
    :height="5"
  />
  <NuxtRouteAnnouncer />
  <FlashMessages />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
