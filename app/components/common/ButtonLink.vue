<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  to?: string
  text?: string
  target?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'primary' | 'secondary' | 'warning' | 'transparent'
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  text: '',
  target: '_self',
  size: 'md',
  type: 'primary',
})

const buttonLinkClasses = computed(() => {
  return [
    {
      'bg-primary text-white hover:bg-primary-dark': props.type === 'primary',
      'bg-secondary text-white hover:bg-secondary-dark':
        props.type === 'secondary',
      'bg-warning text-white hover:bg-warning-dark': props.type === 'warning',
      'bg-transparent text-primary hover:bg-primary-light':
        props.type === 'transparent',
    },
    {
      'text-xs px-2 py-1': props.size === 'xs',
      'text-sm px-2 py-1': props.size === 'sm',
      'text-base px-4 py-2': props.size === 'md',
      'text-lg px-8 py-3': props.size === 'lg',
      'text-xl px-16 py-4': props.size === 'xl',
    },
  ]
})
</script>

<template>
  <NuxtLink
    :to="props.to"
    :target="props.target"
    :class="buttonLinkClasses"
    class="inline-flex w-auto min-w-fit items-center justify-center rounded-3xl bg-primary text-center font-inter text-sm font-medium leading-4 text-white"
  >
    {{ props.text }}
  </NuxtLink>
</template>
