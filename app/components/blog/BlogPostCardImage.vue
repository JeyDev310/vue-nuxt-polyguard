<script setup lang="ts">
import type { BlogPostCardItem } from '#shared/types'

interface Props {
  article?: BlogPostCardItem
  format?: 'row' | 'column'
}

const props = withDefaults(defineProps<Props>(), {
  textLink: 'Read more',
  article: undefined,
  format: 'column',
})

const imageClasses = computed(() => {
  return {
    row: 'h-[296px] sm:h-[240px]',
    column: 'h-[192px]',
  }[props.format]
})
</script>

<template>
  <NuxtLink :to="props.article?.link">
    <NuxtImg
      :class="imageClasses"
      class="w-full shrink-0 rounded-lg object-cover"
      :src="props.article?.image"
      alt=""
    />
  </NuxtLink>
</template>
