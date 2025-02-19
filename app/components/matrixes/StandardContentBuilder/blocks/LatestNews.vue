<script setup lang="ts">
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'

import type { PageSectionsLatestNewsFieldsFragment } from '#shared/types'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

import { computed, useFetch, ref } from '#imports'

import MainContainer from '~/components/layout/MainContainer.vue'
import BlogPostCard from '~/components/blog/BlogPostCard.vue'
import ButtonLink from '~/components/common/ButtonLink.vue'
import SwiperButton from '~/components/common/SwiperButton.vue'

SwiperCore.use([Navigation])

interface Props {
  block?: PageSectionsLatestNewsFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const { data: paginatedBlogPosts } = await useFetch('/api/v1/blog/posts', {
  method: 'POST',
  body: {
    page: 1,
  },
})

const blogPostsCards = computed(() => {
  return (paginatedBlogPosts.value?.blogPosts || []).map((blogPost) => {
    return {
      title: blogPost.title || '',
      category: blogPost.blogCategories[0]?.title || '',
      categoryLink: withLeadingSlash(
        withoutTrailingSlash(blogPost.blogCategories[0]?.uri || ''),
      ),
      description: blogPost.excerptText || '',
      link: withLeadingSlash(withoutTrailingSlash(blogPost.uri || '')),
      image: blogPost.blogFeaturedImage[0]?.url || '',
      authorImage:
        blogPost.contentAuthors[0]?.profileImage.filter(
          (pI) => pI?.__typename === 'media_Asset',
        )[0]?.url || '',
      authorName: blogPost.contentAuthors[0]?.title || '',
      date: blogPost.postDate || '',
    }
  })
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
  <section class="py-28">
    <MainContainer>
      <div class="flex w-full flex-col md:justify-normal">
        <h2
          v-if="props.block?.primaryText"
          class="w-full pb-5 text-left font-montserrat text-5xl font-medium leading-snug text-gray-800"
          v-html="props.block?.primaryText"
        ></h2>

        <div
          class="mb-8 flex flex-col items-center justify-between gap-8 sm:flex-row"
        >
          <p
            v-if="props.block?.secondaryText"
            class="flex w-full items-center text-left font-inter font-light text-gray-800 sm:w-1/2 md:w-3/4 lg:w-4/12"
            v-html="props.block?.secondaryText"
          ></p>

          <div class="flex flex-row items-center justify-center space-x-3">
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
            <SwiperSlide
              v-for="(item, index) in blogPostsCards.slice(0, 12)"
              :key="index"
            >
              <BlogPostCard :article="item" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="my-6 text-center">
          <ButtonLink
            :to="props.block?.primaryLink[0]?.linkUri || undefined"
            :text="props.block?.primaryLink[0]?.linkText || ''"
            size="lg"
          />
        </div>
      </div>
    </MainContainer>
  </section>
</template>
