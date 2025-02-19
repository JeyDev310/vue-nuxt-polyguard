<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore from 'swiper'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { ref, onMounted } from '#imports'
import type { BlogPostCardItem } from '#shared/types'

import BlogPostCardRow from '~/components/blog/BlogPostCardRow.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import SwiperButton from '~/components/common/SwiperButton.vue'

SwiperCore.use([Navigation])

interface Props {
  articles: BlogPostCardItem[]
  blurb?: string
}

const props = withDefaults(defineProps<Props>(), {
  articles: undefined,
  blurb: '',
})

const isMobileSwiper = ref<boolean>(false)
const isBeginning = ref<boolean>(true)
const isEnd = ref<boolean>(false)

onMounted(async () => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

function onSwipe(swiper: SwiperCore) {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

function onSlideChange(swiper: SwiperCore) {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

function checkIfMobile() {
  isMobileSwiper.value = window.innerWidth <= 468
}
</script>

<template>
  <section class="my-8">
    <MainContainer>
      <div class="flex w-full flex-col md:justify-normal">
        <div class="carousel-container relative">
          <div
            class="mb-8 flex w-full flex-col items-center justify-between gap-8 sm:flex-row"
          >
            <div>
              <h2
                class="w-full text-left font-inter text-base leading-snug text-gray-700"
              >
                {{ props.blurb }}
              </h2>
            </div>
            <div
              class="hidden flex-row items-center justify-center space-x-3 sm:flex"
            >
              <SwiperButton
                direction="previous"
                class="swiper-button-prev"
                :status="isBeginning ? 'disabled' : 'active'"
              />
              <SwiperButton
                direction="next"
                class="swiper-button-next"
                :status="isEnd ? 'disabled' : 'active'"
              />
            </div>
          </div>

          <Swiper
            :space-between="20"
            :loop="false"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :breakpoints="{
              320: { slidesPerView: 1.1 },
              468: { slidesPerView: 1.2 },
              640: { slidesPerView: 1.1 },
              768: { slidesPerView: 1.2 },
              890: { slidesPerView: 1.3 },
              1024: { slidesPerView: 1.5 },
            }"
            @swiper="onSwipe"
            @slide-change="onSlideChange"
          >
            <SwiperSlide v-for="(post, index) in props.articles" :key="index">
              <BlogPostCardRow :article="post" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </MainContainer>
  </section>
</template>
