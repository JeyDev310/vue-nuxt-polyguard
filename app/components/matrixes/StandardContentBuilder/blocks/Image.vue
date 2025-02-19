<script setup lang="ts">
import type { PageSectionsImageFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsImageFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})
const image = computed(() => props.block?.imageAsset[0])
const caption = computed(() => props.block?.imageCaption)

const transformedImageUrl = computed(() => {
  return image.value && image.value.__typename === 'media_Asset'
    ? image.value.url
    : null
})

const transformedImageSrcset = computed(() => {
  return image.value && image.value.__typename === 'media_Asset'
    ? image.value.url
    : null
})

const transformedWidth = computed(() =>
  image.value && image.value.__typename === 'media_Asset'
    ? image.value?.width
    : 0,
)

const transformedHeight = computed(() =>
  image.value && image.value.__typename === 'media_Asset'
    ? image.value?.height
    : 0,
)
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div v-if="image && image.__typename === 'media_Asset'" class="my-16 px-6">
      <div class="mx-auto max-w-container">
        <div class="relative mx-auto w-full max-w-article">
          <div class="grid gap-x-5 gap-y-10">
            <div>
              <figure class="image relative w-full space-y-5 overflow-hidden">
                <a
                  :href="image.url || undefined"
                  class="glightbox"
                  :title="caption || image.alt || undefined"
                >
                  <picture>
                    <img
                      class="lazyload lazyload-fade h-full w-full object-cover"
                      :src="transformedImageUrl || undefined"
                      data-sizes="auto"
                      :data-srcset="transformedImageSrcset"
                      :width="transformedWidth || undefined"
                      :height="transformedHeight || undefined"
                      loading="lazy"
                      :alt="image.alt || image.title || undefined"
                    />
                  </picture>
                </a>
                <figcaption
                  v-if="caption"
                  class="image__caption lg:image__caption--alignright text-tertiary"
                >
                  {{ caption }}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
