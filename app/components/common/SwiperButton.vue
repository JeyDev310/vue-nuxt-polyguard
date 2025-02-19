<script setup lang="ts">
interface Props {
  direction: 'previous' | 'next'
  status?: 'active' | 'disabled'
  class?: string
  inverted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'active',
  class: undefined,
  inverted: false,
})

const classes = computed(() => {
  return [
    props.class,
    props.status === 'active' ? 'cursor-pointer' : 'cursor-auto',
    props.status === 'active' && !props.inverted
      ? 'text-blue-400 bg-primary-light border-primary-light hover:text-white hover:bg-blue-400'
      : '',
    props.status === 'active' && props.inverted
      ? 'text-white bg-blue-400 border-blue-400 hover:text-blue-400 hover:bg-white'
      : '',
    props.status === 'disabled' && !props.inverted
      ? 'text-gray-300 bg-white border-gray-300'
      : '',
    props.status === 'disabled' && props.inverted
      ? 'text-gray-300 bg-white border-gray-300'
      : '',
    props.direction === 'previous' ? 'rotate-180' : '',
  ]
})
</script>

<template>
  <div
    :class="classes"
    class="z-10 flex h-12 w-12 transform items-center justify-center rounded-full border border-solid transition"
  >
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.4142136,22.3431458 L36.363961,27.2928932 C36.7544853,27.6834175 36.7544853,28.3165825 36.363961,28.7071068 L31.4142136,33.6568542 L30,32.2426407 L33.242,28.9991458 L19,29 L19,27 L33.24,26.9991458 L30,23.7573593 L31.4142136,22.3431458 Z"
        transform="translate(-532.000000, -799.000000) translate(147.000000, 473.000000) translate(366.000000, 304.000000)"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  </div>
</template>
