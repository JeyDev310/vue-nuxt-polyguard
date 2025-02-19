<script setup lang="ts">
interface Props {
  blogCategories?: Array<{ title: string; uri: string }>
}

const props = withDefaults(defineProps<Props>(), {
  blogCategories: () => [],
})
</script>

<template>
  <div
    class="flex w-full touch-auto flex-row flex-wrap items-center justify-start gap-4"
  >
    <NuxtLink
      v-for="(blogCategory, index) in props.blogCategories"
      :key="index"
      class="rounded-md border-2 border-blue-200 bg-blue-200 px-6 py-3 text-sm text-primary hover:border-primary hover:bg-primary hover:text-white"
      :to="blogCategory.uri"
    >
      {{ blogCategory.title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.router-link-active,
.router-link-exact-active {
  @apply border-primary-dark text-primary-dark;
  &:hover {
    @apply bg-blue-200 text-primary;
  }
}
</style>
