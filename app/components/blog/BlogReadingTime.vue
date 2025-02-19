<script lang="ts" setup>
import ClockIcon from '~/components/common/icons/Clock.vue'

interface Props {
  readingTimeInMin?: string
}

const props = withDefaults(defineProps<Props>(), {
  readingTimeInMin: '',
})

// const readingTime = computed(() => `${Math.ceil(props.readingTimeInMin)}min`)
</script>

<template>
  <div class="flex items-center gap-x-2 font-inter text-sm">
    <div class="hidden w-fit text-nowrap font-light text-gray-500 sm:block">
      Reading time
    </div>
    <ClockIcon />
    <div class="whitespace-nowrap font-light text-gray-800">
      {{ props.readingTimeInMin }}
    </div>
  </div>
</template>
