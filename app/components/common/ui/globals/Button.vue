<script setup lang="ts">
interface Props {
  href?: string
  text?: string
  disabled?: boolean
  secondary?: boolean
  secondary404?: boolean
  third?: boolean
  fourth?: boolean
  border?: boolean
  download?: boolean
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '',
  text: '',
  target: '',
})

const NuxtLink = resolveComponent('nuxt-link')
</script>

<template>
  <Component
    :is="props.href ? NuxtLink : 'button'"
    :to="props.href"
    class="button-text block w-full rounded-l-full rounded-r-full px-6 py-3.5 text-center font-inter duration-300 hover:scale-110 lg:w-fit"
    :class="{
      'bg-white': props.secondary404,
      'text-blue': props.secondary,
      'bg-blue-light text-blue rounded-lg': props.third,
      'bg-grey-light rounded-lg text-black': props.fourth,
      'border-blue border border-dashed': props.border,
      'pointer-events-none': props.disabled,
    }"
    :target="download || target ? '_blank' : '_self'"
    download
  >
    <slot />
  </Component>
</template>
