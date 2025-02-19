<script setup lang="ts">
import type { Media_Asset } from '~~/server/codegen'

interface Props {
  withBg: boolean
  sectionTitle?: string | null
  sectionPrimaryLink?: Record<string, string> | null
  title?: string | null
  image?: Media_Asset | null
  excerpt?: string | null
  category?: {
    title: string
    url: string
    slug?: string
    name?: string
  }
  url?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  withBg: false,
  excerpt: '',
  category: undefined,
  title: '',
  url: '',
  sectionTitle: null,
  sectionPrimaryLink: undefined,
  image: null,
})
</script>

<template>
  <section>
    <div class="px-6 py-20" :class="{ 'bg-tertiary-lightest': props.withBg }">
      <div class="mx-auto max-w-container">
        <div class="flex flex-col space-y-10">
          <!-- Section Header -->
          <div v-if="props.sectionTitle || props.sectionPrimaryLink">
            <div
              class="flex flex-col items-center space-y-10 sm:flex-row sm:space-y-0"
            >
              <div class="flex-1 text-center sm:text-left">
                <div
                  v-if="props.sectionTitle"
                  class="prose--fancy prose mx-auto"
                >
                  <h3>{{ props.sectionTitle }}</h3>
                </div>
              </div>

              <div v-if="props.sectionPrimaryLink?.url">
                <NuxtLink
                  :to="props.sectionPrimaryLink.url"
                  class="button button--secondary"
                >
                  {{ props.sectionPrimaryLink.text }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div>
            <div class="flex flex-col items-center gap-5 sm:flex-row lg:gap-9">
              <!-- Image Section -->
              <div class="w-full sm:w-7/12">
                <div v-if="props.image">
                  <NuxtImg
                    :src="props.image.uri || undefined"
                    :alt="props.image.alt || props.image.title || undefined"
                    class="lazyload lazyload-fade h-full w-full object-cover"
                    loading="lazy"
                    width="320"
                    height="320"
                    :srcset="props.image.srcset"
                  />
                </div>
              </div>

              <!-- Text Section -->
              <div class="w-full sm:w-5/12 lg:w-3/12 2xl:w-4/12">
                <div class="space-y-2">
                  <!-- Category -->
                  <ul
                    v-if="props.category"
                    class="flex flex-wrap items-center font-heading text-xs font-medium"
                  >
                    <li
                      class="flex items-center after:mx-2 after:block after:h-1 after:w-1 after:rounded-full after:bg-primary after:content-[''] last:after:hidden"
                    >
                      <NuxtLink :to="`/blog/category/${props.category.slug}`">
                        {{ props.category.name }}
                      </NuxtLink>
                    </li>
                  </ul>

                  <h5>{{ title }}</h5>
                  <p class="leading-relaxed" v-html="props.excerpt"></p>

                  <NuxtLink
                    :to="props.url || undefined"
                    class="relative z-10 inline-flex items-center space-x-2.5 sm:px-0 lg:-ml-16"
                  >
                    <div>
                      <div class="navigation-control">
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
                    <div class="font-heading text-xs font-medium text-primary">
                      Tell Me More
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
