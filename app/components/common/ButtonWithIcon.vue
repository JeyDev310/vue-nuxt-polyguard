<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    extension?: string
    icon?: string
    target?: string
  }>(),
  {
    to: undefined,
    extension: '',
    icon: '',
    target: '_blank',
  },
)

const { to, extension, target } = props
</script>

<template>
  <NuxtLink
    :to="to"
    :target="target"
    class="w-68 h-34 inline-flex items-center justify-center gap-2 rounded-full bg-custom-blue text-center font-inter text-sm font-medium leading-4 text-white"
  >
    {{ extension.toUpperCase() }}
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.41602 8.99996L6.99935 13.5833M6.99935 13.5833L11.5827 8.99996M6.99935 13.5833L6.99935 1.66663"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.5 16.333H12.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </NuxtLink>
</template>
