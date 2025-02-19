<script setup lang="ts">
import type { PageSectionsResponsiveImageBannerFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsResponsiveImageBannerFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

// Image selection logic
const selectedMobileImage = computed(() =>
  props.block?.mobileImage ? props.block.mobileImage[0] : null,
)

const selectedTabletImage = computed(() =>
  props.block?.tabletImage ? props.block?.tabletImage[0] : null,
)

const selectedDesktopImage = computed(() =>
  props.block?.desktopImage ? props.block?.desktopImage[0] : null,
)

const selectedDesktopXlImage = computed(() =>
  props.block?.desktopXlImage ? props.block?.desktopXlImage[0] : null,
)

// Linked Entry URL
const linkedEntryUrl = computed(() => {
  const entry = props.block?.bannerLinkedEntry[0]
  return entry?.url ?? null
})

// Transformed image URLs
const transformedMobileImageUrl = computed(() => {
  const image = selectedMobileImage.value
  if (image?.__typename === 'media_Asset')
    // Check for animated images and handle accordingly
    return image?.url || image?.transform_640
  else return null
})
const transformedTabletImageUrl = computed(() => {
  const image = selectedTabletImage.value
  if (image?.__typename === 'media_Asset')
    return image?.url || image?.transform_768
  else return null
})

const transformedDesktopImageUrl = computed(() => {
  const image = selectedDesktopImage.value
  if (image?.__typename === 'media_Asset')
    return image?.url || image?.transform_1024
  else return null
})

const transformedDesktopXlImageUrl = computed(() => {
  const image = selectedDesktopXlImage.value
  if (image?.__typename === 'media_Asset')
    return image?.url || image?.transform_1280
  else return null
})
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->

    <div v-if="props.block?.mobileImage" class="my-8 px-6">
      <div class="mx-auto max-w-container">
        <div class="relative mx-auto w-full max-w-full">
          <h2
            v-if="props.block?.primaryText"
            class="mb-8 text-4xl leading-tight md:text-5xl"
          >
            {{ props.block?.primaryText }}
          </h2>

          <div class="grid gap-x-5 gap-y-10">
            <div>
              <figure class="image relative w-full space-y-5 overflow-hidden">
                <NuxtLink v-if="linkedEntryUrl" :to="linkedEntryUrl">
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      :srcset="transformedDesktopXlImageUrl || undefined"
                    />
                    <source
                      media="(min-width: 1024px)"
                      :srcset="transformedDesktopImageUrl || undefined"
                    />
                    <source
                      media="(min-width: 768px)"
                      :srcset="transformedTabletImageUrl || undefined"
                    />
                    <source
                      media="(min-width: 640px)"
                      :srcset="transformedMobileImageUrl || undefined"
                    />
                    <img
                      class="lazyload lazyload-fade h-full w-full object-cover"
                      :src="transformedMobileImageUrl || undefined"
                      loading="lazy"
                      :alt="
                        props.block?.mobileImage[0]?.__typename ===
                        'media_Asset'
                          ? props.block?.mobileImage[0]?.alt ||
                            props.block?.mobileImage[0]?.title ||
                            undefined
                          : undefined
                      "
                    />
                  </picture>
                </NuxtLink>
                <picture v-else>
                  <source
                    media="(min-width: 1280px)"
                    :srcset="transformedDesktopXlImageUrl || undefined"
                  />
                  <source
                    media="(min-width: 1024px)"
                    :srcset="transformedDesktopImageUrl || undefined"
                  />
                  <source
                    media="(min-width: 768px)"
                    :srcset="transformedTabletImageUrl || undefined"
                  />
                  <source
                    media="(min-width: 640px)"
                    :srcset="transformedMobileImageUrl || undefined"
                  />
                  <img
                    class="lazyload lazyload-fade h-full w-full object-cover"
                    :src="transformedMobileImageUrl || undefined"
                    loading="lazy"
                    :alt="
                      props.block?.mobileImage[0]?.__typename === 'media_Asset'
                        ? props.block?.mobileImage[0]?.alt ||
                          props.block?.mobileImage[0]?.title ||
                          undefined
                        : undefined
                    "
                  />
                </picture>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
