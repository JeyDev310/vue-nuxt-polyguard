<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

import type { BlogPostCardItem } from '#shared/types'
import { ref } from '#imports'
import MainContainer from '~/components/layout/MainContainer.vue'
import SwiperButton from '~/components/common/SwiperButton.vue'

SwiperCore.use([Navigation])

interface Props {
  articles: BlogPostCardItem[]
  title?: string
  blurb?: string
}

const props = withDefaults(defineProps<Props>(), {
  articles: undefined,
  title: 'Related Posts',
  blurb: 'Explore our articles to learn more about products in application.',
})

const isBeginning = ref<boolean>(true)
const isEnd = ref<boolean>(false)

function onSwipe(swiper: SwiperCore) {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

function onSlideChange(swiper: SwiperCore) {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}
</script>

<template>
  <section class="bg-primary-light py-20">
    <MainContainer>
      <div class="flex w-full flex-col md:justify-normal">
        <h2 class="w-full pb-4 text-left font-montserrat text-5xl leading-snug">
          {{ props.title }}
        </h2>
        <div
          class="mb-8 flex flex-col items-center justify-between gap-8 font-medium sm:flex-row"
        >
          <p class="flex w-full items-center text-left font-inter font-light">
            {{ props.blurb }}
          </p>
          <div class="flex flex-row items-center justify-center space-x-3">
            <SwiperButton
              direction="previous"
              class="swiper-button-prev"
              inverted
              :status="isBeginning ? 'disabled' : 'active'"
            />
            <SwiperButton
              direction="next"
              class="swiper-button-next"
              inverted
              :status="isEnd ? 'disabled' : 'active'"
            />
          </div>
        </div>
        <div class="mb-6">
          <Swiper
            :slides-per-view="3"
            :space-between="20"
            :loop="false"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :breakpoints="{
              350: { slidesPerView: 1.2 }, // Mobile (1.5 cards)
              768: { slidesPerView: 2.2 }, // Tablet (2.5 cards)
              1024: { slidesPerView: 3 }, // Desktop (3 cards)
            }"
            @swiper="onSwipe"
            @slide-change="onSlideChange"
          >
            <SwiperSlide v-for="(post, index) in props.articles" :key="index">
              <BlogPostCard :article="post" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </MainContainer>
  </section>
</template>
