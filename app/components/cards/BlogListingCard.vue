<script setup lang="ts">
import { computed } from 'vue'
import type { BlogMedia_Asset } from '~~/server/codegen'

interface Props {
  title?: string | null
  primaryText?: string | null
  excerpt?: string | null
  uri?: string | null
  secondaryText?: string | null
  category?: string | null
  image?: BlogMedia_Asset
}

const props = defineProps<Props>()

// Configuration constants
const MAX_TITLE_LENGTH = 70
const MAX_TEXT_LENGTH = 200

// Truncate primary text
const truncatedPrimaryText = computed(() => {
  const text = props.primaryText || props.title
  return text && text.length > MAX_TITLE_LENGTH
    ? text.slice(0, MAX_TITLE_LENGTH) + '...'
    : text
})

// Strip HTML and truncate secondary text
const truncatedSecondaryText = computed(() => {
  const text = props.excerpt || props.secondaryText
  const strippedText = text ? stripHtmlTags(text) : ''

  return strippedText.length > MAX_TEXT_LENGTH
    ? strippedText.slice(0, MAX_TEXT_LENGTH) + '...'
    : strippedText
})

// Determine entry link
const entryLink = computed(() => props.uri || '#')

// Determine category
const category = computed(() => props.category || '')

// Determine card image
const cardImage = computed(() => props.image)
console.log('props.image' + props.image)
// Image source handling (placeholder for actual image transformation logic)
const desktopImageSources = computed(() => {
  // In a real implementation, you'd use actual image transformation logic
  return cardImage.value?.uri
})

const baseImageSources = computed(() => {
  // In a real implementation, you'd use actual image transformation logic
  return cardImage.value?.uri
})

// Utility function to strip HTML tags
function stripHtmlTags(html: string) {
  return html ? html.replace(/<[^>]*>/g, '') : ''
}
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div class="relative flex flex-col gap-4 rounded-2xl">
      <!-- Image Section -->
      <div v-if="cardImage">
        <NuxtPicture
          :src="cardImage.url || undefined"
          :alt="cardImage.alt || cardImage.title || undefined"
          :img-attrs="{
            class:
              'lazyload lazyload-fade object-cover w-full h-full rounded-2xl',
            loading: 'lazy',
          }"
          :sources="[
            { media: '(min-width: 768px)', srcset: desktopImageSources },
            { srcset: baseImageSources },
          ]"
        />
      </div>

      <!-- Content Section -->
      <div class="flex flex-col gap-3">
        <div class="min-h-22">
          <NuxtLink :to="entryLink" class="text-xl font-medium text-black">
            {{ truncatedPrimaryText }}
          </NuxtLink>
        </div>

        <div class="text-xs font-medium text-black">
          {{ category }}
        </div>

        <div class="font-regular min-h-28 text-sm text-tertiary">
          {{ truncatedSecondaryText }}
        </div>
      </div>

      <!-- Read More Button -->
      <div>
        <NuxtLink
          :to="entryLink"
          class="inline-flex h-12 min-h-10 w-full cursor-pointer items-center justify-center rounded-3xl border-2 border-primary bg-white px-8 py-2 align-middle font-heading text-sm font-semibold leading-tight text-primary transition"
        >
          Read More
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
