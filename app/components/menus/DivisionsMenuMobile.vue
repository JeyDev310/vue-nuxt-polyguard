<script lang="ts" setup>
import { withLeadingSlash } from 'ufo'

interface Props {
  title?: string
  divisionsMenu: Array<MenuNodeItem>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Polyguard Divisions',
})
</script>

<template>
  <div class="mt-8 text-xl font-normal text-neutral-text-gray">
    {{ props.title }}
  </div>
  <div class="mt-6 flex flex-wrap gap-4">
    <NuxtLink
      v-for="(item, index) in divisionsMenu"
      :key="index"
      :href="withLeadingSlash(item.nodeUri ?? '')"
      :target="item.newWindow ? '_blank' : '_self'"
    >
      <h6
        class="flex items-center rounded-full px-4 py-2 text-base font-light hover:bg-blue-100 hover:text-gray-700"
      >
        {{ item.title }}
      </h6>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
h6 {
  @apply bg-gray-1;
  @apply text-neutral-text-gray;
}

.router-link-active h6,
.router-link-exact-active h6 {
  @apply bg-primary text-white;
}
</style>
