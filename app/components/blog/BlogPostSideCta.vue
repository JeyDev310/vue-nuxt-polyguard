<script setup lang="ts">
import type { BlogCategory } from '#shared/types'
// import RightArrowIcon from '~/components/common/icons/RightArrow.vue'

interface Props {
  category?: BlogCategory
  textLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  textLink: 'View Pipeline Products',
  category: () => ({
    image: '/images/LatestNews.jpeg',
    title: 'Explore Our Pipeline Products',
    description:
      'Lorem ipsum dolor sit amet consectetur. Viverra mi lorem nisi diam.',
    uri: '/blog/our-first-office',
  }),
})

function truncateText(text: string, length: number = 100): string {
  const roundedLength = Math.ceil(length)

  return text.length > roundedLength
    ? `${text.slice(0, roundedLength)}...`
    : text
}
</script>

<template>
  <div class="w-full rounded-lg bg-primary p-6">
    <div class="text-white">
      <h2 class="mb-2 w-full text-left font-inter text-lg font-medium">
        {{ truncateText(props.category.title ?? '', 60) }}
      </h2>
      <p class="text-sm font-light">
        {{ truncateText(props.category.description ?? '', 60) }}
      </p>
    </div>
    <div class="mx-auto mt-6 w-full text-center">
      <NuxtLink
        to="/resources"
        class="block w-full rounded-3xl bg-white py-2 text-center text-sm font-semibold text-primary"
        >Explore Our Resources
      </NuxtLink>
    </div>
    <NuxtImg
      class="mt-6 w-full rounded-lg object-cover"
      src="/images/postsidecta.png"
      alt=""
    />
  </div>
</template>
