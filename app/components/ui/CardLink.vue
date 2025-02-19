<script setup lang="ts">
import RightArrowIcon from '~/components/common/icons/RightArrow.vue'

interface Props {
  to?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: '#',
  text: 'Read More',
})
</script>

<template>
  <NuxtLink :to="props.to" class="text-polyguard-blue hover:underline">
    <div
      class="inline-flex items-center font-inter text-sm font-medium text-primary transition lg:hover:text-primary-dark lg:hover:decoration-primary-dark"
    >
      <span>{{ props.text }}</span>
      <RightArrowIcon class="ml-1 h-3 w-7" />
    </div>
  </NuxtLink>
</template>
