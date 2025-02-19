<script lang="ts" setup>
import { computed } from '#imports'

interface Props {
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const extraClasses = computed(() => {
  const classes = []
  switch (props.size) {
    case 'small':
      classes.push('hover:scale-105')
      break
    case 'medium':
      classes.push('hover:scale-110')
      break
    case 'large':
      classes.push('hover:scale-125')
      break
    case 'extra-large':
      classes.push('hover:scale-150')
      break
    default:
      classes.push('hover:scale-110')
      break
  }

  return classes
})
</script>

<template>
  <div
    class="transform transition duration-500 ease-in-out"
    :class="extraClasses"
  >
    <slot />
  </div>
</template>
