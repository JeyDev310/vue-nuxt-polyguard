<script setup lang="ts">
import type { PageSectionsFormosanMapFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsFormosanMapFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const timelineEvents = computed(
  () =>
    props.block?.timelineEvents
      .filter((te) => te !== null && te !== undefined)
      .map((te) => ({
        eventTitle: te.eventTitle ?? '',
        eventContent: te.eventContent ?? '',
      })) ?? [],
)
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div
      id="animation-map-section"
      class="animation-map-section large-font-content relative overflow-y-hidden text-text-gray"
    >
      <div
        class="animation-map-container mx-auto max-w-container-header px-6 md:px-4 2xl:px-0"
      >
        <div
          v-if="props.block?.primaryText"
          id="section-title"
          class="sticky top-0 z-20 w-full bg-white"
        >
          <h3
            class="heading-3 mx-auto mb-10.5 max-w-[865px] py-4 text-left text-primary md:mb-18 md:text-center"
          >
            {{ props.block?.primaryText }}
          </h3>
        </div>
        <div class="w-full">
          <LottieMapComponent
            src="/lottie/formosan-map.lottie"
            :timeline-events="timelineEvents"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.animation-map-container::-webkit-scrollbar {
  display: none;
}
.animation-map-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
