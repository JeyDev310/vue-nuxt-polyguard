<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  color: 'primary',
  size: 'md',
  disabled: false,
  text: 'Click me',
})

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center min-w-fit rounded-full border border-transparent px-8 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-primary text-white hover:bg-indigo-700 focus:ring-indigo-500':
        props.color === 'primary',
      'bg-[#60b8b8] text-white hover:bg-gray-400 focus:ring-gray-500':
        props.color === 'secondary',
      'bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500':
        props.color === 'warning',
      'text-sm px-3 py-1': props.size === 'sm',
      'text-base px-4 py-2': props.size === 'md',
      'text-lg px-6 py-3': props.size === 'lg',
    },
  ]
})
</script>

<template>
  <button type="button" :class="buttonClasses">
    {{ props.text }}
  </button>
</template>
