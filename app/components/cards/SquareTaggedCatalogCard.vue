<script setup lang="ts">
import { ref } from 'vue'
const isHovered = ref(false)

interface Props {
  primaryText: string
  secondaryText?: string
  cardLink?: Array<{
    linkUri?: string | null
  } | null> | null
  category?: string
  useEntryLink?: boolean
  cardImage?: {
    srcset?: string | null
    url?: string | null
    alt?: string | null
  }
  cardTags?: string
  cardStyle?: string
  entryUrl?: string
  primaryLink?: {
    linkText?: string | null
  }
}

const props = withDefaults(defineProps<Props>(), {
  secondaryText: undefined,
  cardLink: () => [],
  category: undefined,
  useEntryLink: false,
  cardImage: () => ({
    srcset: '/path/to/image-400w.jpg 400w, /path/to/image-800w.jpg 800w',
    url: '',
    alt: '',
  }),
  cardTags: undefined,
  cardStyle: 'large',
  entryUrl: '/sample-entry-url',
  primaryLink: () => ({
    linkText: 'Read More',
  }),
})

const cardLink = computed(() => {
  return props.cardLink && !props.useEntryLink
    ? '/' + (props.cardLink[0]?.linkUri || '').replace(/^\/+/, '')
    : props.entryUrl
})
</script>

<template>
  <NuxtLink :to="cardLink">
    <div
      class="group relative flex flex-col rounded-3xl bg-[#F3F8FE] p-8 transition-transform duration-300 hover:shadow-lg md:flex-row"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        class="group relative h-[271px] min-h-[271px] w-[219px] min-w-[219px] overflow-hidden rounded-md"
      >
        <NuxtImg
          :src="props.cardImage.url ?? ''"
          :alt="props.cardImage.alt ?? ''"
          :data-srcset="props.cardImage.srcset"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div class="mt-5 flex flex-col justify-between md:ml-5 md:mt-0">
        <div>
          <h4
            class="sm:text-md 'text-black' mb-5 break-all text-base lg:text-2xl"
            :class="{ 'text-[#99C1F5]': isHovered }"
          >
            {{ props.primaryText }}
          </h4>
          <div class="text-sm text-[#535965]">
            {{ props.secondaryText }}
          </div>
        </div>
        <div>
          <span
            v-for="(tag, index) in cardTags.split(',')"
            :key="index"
            class="mr-2 inline-flex items-center text-sm"
          >
            {{ tag }}
            <svg
              v-if="index < cardTags.split(',').length - 1"
              class="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#348EF2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
