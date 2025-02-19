<script lang="ts" setup>
import type { MenuNodeItem } from '#shared/types'

interface Props {
  divisionsMenu: Array<MenuNodeItem>
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="hidden items-center justify-center px-6 lg:flex lg:gap-x-14">
    <div v-for="(item, index) in props.divisionsMenu" :key="index">
      <NuxtLink
        :to="item.nodeUri ?? '/'"
        :target="item.newWindow ? '_blank' : '_self'"
      >
        <h6
          class="py-1 text-left text-[9px] font-normal uppercase leading-4 hover:text-[#348ef2]"
        >
          {{ item.title }}
        </h6></NuxtLink
      >
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.router-link-active h6 {
  display: flex;
  padding: 0.5rem 0.75rem;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1;
  color: var(--util-nav-item-color, #000);
}

.router-link-exact-active h6 {
  border-radius: 0.75rem;
  --tw-bg-opacity: 1;
  background-color: rgb(52 142 242 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
