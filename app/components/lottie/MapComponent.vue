<script setup lang="ts">
import { create } from '@lottiefiles/lottie-interactivity'
import { onMounted, ref } from '#imports'

interface TimelineEvent {
  eventTitle: string
  eventContent: string
}

interface Props {
  src: string
  timelineEvents: Array<TimelineEvent>
}

interface LottiePlayer extends HTMLDivElement {
  getLottie: () => unknown
}

const props = defineProps<Props>()

const isSticky = ref<boolean>(false)
const stickyElement = ref<HTMLElement>()
const lottieElement = ref<HTMLElement>()

onMounted(async () => {
  if (import.meta.client) {
    await import('@dotlottie/player-component')
    window.addEventListener('scroll', () => {
      const animationMapSection = document.getElementById(
        'animation-map-section',
      ) as HTMLElement

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const animationMapSectionOffsetTop = animationMapSection.offsetTop
      const sectionTitle = document.getElementById('section-title')
      const timeline = document.getElementById('timeline')
      const headerMainWrap = document.getElementsByTagName('header')
      const headerMainWrapHeight = headerMainWrap[0]?.offsetHeight ?? 0

      if (!sectionTitle || !timeline) return

      if (scrollTop >= animationMapSectionOffsetTop - headerMainWrapHeight) {
        animationMapSection.classList.remove('overflow-y-hidden')
        animationMapSection.classList.add('overflow-y-auto')
      } else {
        animationMapSection.classList.remove('overflow-y-auto')
        animationMapSection.classList.add('overflow-y-hidden')
        animationMapSection.style.height = `${700}px`
      }
    })

    const player = document.querySelector('#firstLottie') as LottiePlayer

    if (player) {
      player.addEventListener('ready', () => {
        create({
          player: player.getLottie(),
          mode: 'scroll',
          container: '#map-content',
          actions: [
            {
              visibility: [0.1, 0.2],
              type: 'seek',
              frames: [0, 180],
            },
            {
              visibility: [0.2, 0.4],
              type: 'seek',
              frames: [180, 360],
            },
            {
              visibility: [0.4, 0.55],
              type: 'seek',
              frames: [360, 540],
            },
            {
              visibility: [0.55, 0.7],
              type: 'seek',
              frames: [540, 720],
            },
            {
              visibility: [0.7, 85],
              type: 'seek',
              frames: [720, 900],
            },
            {
              visibility: [0.85, 1],
              type: 'seek',
              frames: [900, 1080],
            },
          ],
        })
      })
    }
  }
})
</script>

<template>
  <section class="container mx-auto">
    <div class="trigger" />
    <div
      ref="stickyElement"
      class="section-to-stick"
      :class="{ sticky: isSticky }"
    >
      <div
        id="map-content"
        class="flex flex-col-reverse gap-x-11 gap-y-10.5 md:flex-row md:gap-y-14"
      >
        <div id="timeline" class="relative mt-10.5 md:mt-0 md:w-[742px]">
          <div
            class="timeline-line absolute bottom-screen left-3 top-0 border-r border-dashed border-gray-3 md:left-[18px]"
          />
          <div
            v-for="(item, index) in props.timelineEvents"
            :key="index"
            class="md:h-50 align-items-center flex h-[50vh]"
          >
            <div class="z-1 mr-6">
              <svg
                class="h-6 w-6 md:h-auto md:w-auto"
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="37" height="37" rx="18.5" fill="#348EF2" />
                <circle cx="18" cy="19" r="7" fill="#73B5FF" />
              </svg>
            </div>
            <div>
              <h4>{{ item.eventTitle }}</h4>
              <div
                class="mt-4 text-text-gray/70"
                v-html="item.eventContent"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="lottie sticky top-[300px] z-10 h-full bg-white md:top-40 md:w-[608px]"
        >
          <dotlottie-player
            id="firstLottie"
            ref="lottieElement"
            :src="props.src"
            loop
            mode="normal"
            container=".map-content"
            style="width: 100%; height: 400px"
          />
        </div>
      </div>
    </div>
  </section>
</template>
