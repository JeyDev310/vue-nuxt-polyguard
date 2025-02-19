<script setup lang="ts">
import type { PageSectionsVideoGridFieldsFragment } from '~~/server/codegen'
import { computed, useCustomTailwind } from '#imports'

interface Props {
  block?: PageSectionsVideoGridFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const { pt, pb } = useCustomTailwind()

const youtubeVideos = computed(() => props.block?.videos ?? [])
const sectionIdName = computed(() => props.block?.sectionIdName ?? '')
const bgColor = computed(() => props.block?.backgroundColor ?? 'white')
const paddingTop = computed((): number =>
  parseFloat((props.block?.paddingTop ?? 0).toString()),
)
const paddingBottom = computed((): number =>
  parseFloat((props.block?.paddingBottom ?? 0).toString()),
)
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div>
      <div
        v-if="sectionIdName"
        :id="sectionIdName"
        class="sr-only -mt-36 mb-36"
      >
        Youtube Video Grid
      </div>

      <div
        :class="[
          'youtube-video-grid',
          { 'bg-gray-1': bgColor === 'blue' },
          'px-6 md:px-4 2xl:px-0',
          `${pt(paddingTop)} ${pb(paddingBottom)}`,
        ]"
      >
        <div class="mx-auto max-w-container">
          <div class="swiper xl:!-mr-10 2xl:!-mr-28" data-slider-video-grid>
            <div class="swiper-wrapper grid gap-x-6 gap-y-7 md:grid-cols-4">
              <div
                v-for="(youtubeVideo, index) in youtubeVideos"
                :key="youtubeVideo?.id ?? `fallback-key-${index}`"
                class="swiper-slide"
              >
                <CardsVideoCard
                  :title="youtubeVideo?.videoTitle || ''"
                  :thumbnail="{ url: youtubeVideo?.video[0]?.img ?? '' }"
                  :video-asset-id="youtubeVideo?.id ?? ''"
                  :embedded-asset="youtubeVideo?.video[0]?.embeddedAsset"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.youtube-video-grid {
  @media (min-width: 1025px) {
    /* Disable swiper in desktop */

    .swiper {
      overflow: visible;
      .swiper-wrapper {
        display: grid !important;
        transform: unset !important;
        .swiper-slide {
          width: auto !important;
        }
      }
    }
  }
}
</style>
