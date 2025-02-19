<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  image?: Array<{
    url: string
    width: number
    height: number
    alt?: string
    title?: string
  }>
  richText?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  image: () => [],
  richText: null,
})

const displayImage = computed(() => {
  return Array.isArray(props.image) && props.image.length > 0
    ? props.image
    : null
})
</script>

<template>
  <div>
    <picture v-if="displayImage">
      <NuxtImg
        v-if="displayImage && displayImage[0]"
        class="h-full w-full rounded-lg object-cover md:rounded-none"
        :src="displayImage[0].url || ''"
        :srcset="displayImage[0].url || ''"
        sizes="auto"
        :width="displayImage[0].width ?? 0"
        :height="displayImage[0].height ?? 0"
        loading="lazy"
        :alt="displayImage[0].alt ?? displayImage[0].title ?? ''"
      />
    </picture>

    <div
      v-if="richText"
      class="desc prose mt-4 text-text-gray/70 md:mt-6"
      v-html="richText"
    />
  </div>
</template>
