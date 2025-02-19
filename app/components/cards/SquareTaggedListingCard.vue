<script setup lang="ts">
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

const cardTagsArray = computed(() => {
  return props.cardTags ? props.cardTags.split(',') : []
})
</script>

<template>
  <NuxtLink
    :to="
      cardLink && !useEntryLink
        ? '/' + (cardLink[0]?.linkUri || '').replace(/^\/+/, '')
        : entryUrl
    "
    class="aspect-auto relative block aspect-fullimagecard"
    :class="
      props.cardStyle === 'small'
        ? 'aspect-fullimageshallowcard min-h-72 md:min-h-full'
        : ''
    "
  >
    <!-- Image Section -->
    <figure v-if="props.cardImage" class="absolute inset-0 h-full w-full">
      <NuxtImg
        :src="props.cardImage.url ?? ''"
        :alt="props.cardImage.alt ?? ''"
        :data-srcset="props.cardImage.srcset"
        class="lazyload lazyload-fade h-full w-full object-cover"
        width="400"
        height="400"
        loading="lazy"
      />
    </figure>

    <div
      class="absolute inset-0 z-0 h-full w-full before:absolute before:h-full before:w-full before:bg-black before:opacity-40 after:absolute after:h-full after:w-full after:bg-gradient-to-t after:from-black after:opacity-40"
    />

    <div class="relative z-10 flex h-full flex-col">
      <!-- Text and Category -->
      <div
        class="flex-auto space-y-2 px-6 pt-6 text-white sm:px-11 sm:pt-11 xl:text-right"
      >
        <div v-if="props.category" class="flex xl:justify-end">
          <div
            class="flex min-h-5 min-w-20 items-center truncate rounded-full bg-white px-3.5 text-center font-heading text-[0.5625rem] font-medium leading-none tracking-wide text-primary"
          >
            {{ props.category }}
          </div>
        </div>

        <h4
          class="text-xl md:line-clamp-3 xl:line-clamp-none 2xl:text-2xl"
          v-html="props.primaryText"
        />
        <p
          v-if="props.secondaryText"
          class="leading-relaxed sm:line-clamp-6"
          v-html="props.secondaryText"
        />
      </div>

      <!-- Tags and Link -->
      <div
        class="mb-10 mt-10 flex-shrink justify-end space-y-5 px-6 sm:px-11 xl:mt-0 xl:flex xl:space-x-5 xl:space-y-0 xl:px-0"
      >
        <div v-if="props.cardTags" class="flex items-center">
          <ul
            class="flex flex-wrap items-center font-heading text-sm font-medium text-white"
          >
            <li
              v-for="(tag, index) in cardTagsArray"
              :key="index"
              class="flex items-center after:mx-2 after:block after:h-1 after:w-1 after:rounded-full after:bg-primary after:content-[''] last:after:hidden"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
        <div>
          <div class="flex items-center space-x-4 xl:-mr-7">
            <div v-if="!props.cardTags" class="text-sm font-medium text-white">
              {{ props.primaryLink?.linkText }}
            </div>
            <div>
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
