<script setup lang="ts">
import type { BlogPostCardItem } from '#shared/types'

import Badge from '~/components/ui/Badge.vue'
import BlogAuthorInfo from '~/components/blog/BlogAuthorInfo.vue'
import CardLink from '~/components/ui/CardLink.vue'

interface Props {
  article?: BlogPostCardItem
  textLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  article: undefined,
  textLink: 'Read more',
})

function truncateText(text: string, length: number = 100): string {
  const roundedLength = Math.ceil(length)

  return text.length > roundedLength
    ? `${text.slice(0, roundedLength)}...`
    : text
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-between">
    <div class="mb-4 w-full">
      <Badge :text="props.article?.category" class="mb-4" />

      <BlogAuthorInfo
        :author-image-url="props.article?.authorImage"
        :author-name="props.article?.authorName"
        :post-date="props.article?.date"
        class="mb-3.5"
      />

      <NuxtLink :to="props.article?.link">
        <h2
          class="mb-3 line-clamp-2 w-full text-left font-montserrat text-lg font-semibold tracking-wider text-gray-800 xl:text-xl"
        >
          {{ truncateText(props.article?.title ?? '', 60) }}
        </h2>
      </NuxtLink>
      <p class="text-inter line-clamp-3 text-sm font-light text-gray-800">
        {{ truncateText(props.article?.description ?? '', 90) }}
      </p>
    </div>
    <div class="w-full">
      <CardLink :to="props.article?.link" text="Read more" />
    </div>
  </div>
</template>
