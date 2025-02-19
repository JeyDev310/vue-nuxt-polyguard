<script setup lang="ts">
import type { BlogPostCardItem } from '#shared/types'
import BlogPostCardText from '~/components/blog/BlogPostCardText.vue'
import SimpleCard from '~/components/common/SimpleCard.vue'

interface Props {
  article?: BlogPostCardItem
  textLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  textLink: 'Read more',
  article: undefined,
})

const heightsFromMdTo3Xl = [
  '@md:min-h-[340px]',
  '@lg:min-h-[292px]',
  '@xl:min-h-[292px]',
  '@2xl:min-h-[272px]',
  '@3xl:min-h-[244px]',
]
</script>

<template>
  <SimpleCard>
    <div class="h-full w-full @container">
      <div
        class="flex min-h-[536px] w-full max-w-[486px] flex-col items-center justify-start gap-6 @2xs:min-h-[480px] @xs:min-h-[470px] @sm:min-h-[460px] @md:min-h-[340px] @md:max-w-[991px] @md:flex-row-reverse @md:justify-between @lg:min-h-[292px] @xl:min-h-[292px] @2xl:min-h-[272px] @3xl:min-h-[244px]"
      >
        <div class="h-[192px] w-full @md:h-full @md:w-1/2">
          <NuxtLink :to="props.article?.link">
            <NuxtImg
              :class="heightsFromMdTo3Xl"
              class="h-full min-h-[192px] w-full shrink-0 rounded-lg object-cover"
              :src="props.article?.image"
              alt=""
            />
          </NuxtLink>
        </div>

        <div class="h-full w-full @md:h-full @md:w-1/2">
          <BlogPostCardText
            :class="heightsFromMdTo3Xl"
            :article="props.article"
            :text-link="props.textLink"
          />
        </div>
      </div>
    </div>
  </SimpleCard>
</template>
