<script lang="ts" setup>
interface Props {
  text?: string
  color?: 'primary'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Default text',
  color: 'primary',
  class: '',
})

const classes = computed(() => {
  return [
    props.color === 'primary' ? 'bg-primary-light text-primary' : '',
    props.class,
  ]
})
</script>

<template>
  <div
    :class="classes"
    class="inline-block h-6 w-fit rounded bg-primary-light px-2 py-1 text-xs text-primary"
  >
    {{ props.text }}
  </div>
</template>
