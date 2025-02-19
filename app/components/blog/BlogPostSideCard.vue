<script setup lang="ts">
import type { BlogCategory } from '#shared/types'

import RightArrowIcon from '~/components/common/icons/RightArrow.vue'

interface Props {
  category?: BlogCategory
  textLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  textLink: 'View Pipeline Products',
  category: () => ({
    image: '/images/LatestNews.png',
    title: 'Explore Our Pipeline Products',
    description:
      'Lorem ipsum dolor sit amet consectetur. Viverra mi lorem nisi diam.',
    authorImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    uri: '/blog/our-first-office',
  }),
})

const cardLink = computed(() => props.category.uri)

function truncateText(text: string, length: number = 100): string {
  const roundedLength = Math.ceil(length)

  return text.length > roundedLength
    ? `${text.slice(0, roundedLength)}...`
    : text
}
</script>

<template>
  <div
    class="flex w-full flex-col items-center space-y-6 rounded-lg bg-gray-1 p-6"
  >
    <div class="flex h-full w-full flex-col items-center">
      <div class="w-full">
        <NuxtLink :to="cardLink">
          <h2 class="mb-2 w-full text-left font-inter text-lg font-medium">
            {{ truncateText(props.category.title ?? '', 60) }}
          </h2>
        </NuxtLink>

        <p class="mb-4 text-sm font-light text-gray-800">
          {{ truncateText(props.category.description ?? '', 60) }}
        </p>

        <NuxtLink :to="cardLink" class="text-polyguard-blue hover:underline">
          <div
            class="inline-flex items-center font-inter text-sm font-medium text-primary transition lg:hover:text-primary-dark lg:hover:decoration-primary-dark"
          >
            <div>{{ props.textLink }}</div>
            <RightArrowIcon class="ml-2 h-4 w-6" />
          </div>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink :to="cardLink" class="h-full w-full">
      <NuxtImg
        class="h-[192px] w-full shrink-0 rounded-lg object-cover"
        :src="props.category.image"
        alt=""
      />
    </NuxtLink>
  </div>
</template>
