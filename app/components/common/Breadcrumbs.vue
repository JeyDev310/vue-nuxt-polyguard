<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import type { BreadcrumbItem } from '#shared/types'
import { withLeadingSlash } from 'ufo'

interface Props {
  items: Array<BreadcrumbItem>
}

const props = defineProps<Props>()

const secondLastItem = computed(() => {
  return props.items.length > 1 ? props.items[props.items.length - 2] : null
})
</script>

<template>
  <nav class="flex min-h-4" aria-label="Breadcrumbs">
    <!-- Mobile version (only second last item with back arrow) -->
    <div v-if="secondLastItem" class="flex items-center space-x-2 sm:hidden">
      <ChevronLeftIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
      <NuxtLink
        :to="withLeadingSlash(secondLastItem.href)"
        class="text-base font-normal text-gray-500 hover:text-gray-700"
      >
        {{ secondLastItem.name }}
      </NuxtLink>
    </div>

    <!-- Desktop version (full breadcrumbs) -->
    <ol role="list" class="hidden items-center space-x-4 sm:flex">
      <li
        v-for="(item, index) in props.items"
        :key="item.name"
        class="flex items-center space-x-4"
        :class="{
          'font-normal text-gray-800': !item.current,
          'font-light text-gray-400': item.current,
        }"
      >
        <NuxtLink
          :to="withLeadingSlash(item.href)"
          class="text-base hover:text-gray-700"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</NuxtLink
        >
        <svg
          v-if="index < props.items.length - 1"
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="15"
          viewBox="0 0 6 15"
          fill="none"
        >
          <path
            d="M5.34091 0.818181L1.59091 14.75H0.363636L4.11364 0.818181H5.34091Z"
            fill="#9FACBA"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>
