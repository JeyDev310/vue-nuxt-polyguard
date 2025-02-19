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
</script>

<template>
  <SimpleCard>
    <div class="h-full w-full @container">
      <div
        class="flex h-full min-h-[480px] w-full max-w-[486px] flex-col items-start justify-start gap-6 @2xs:min-h-[480px] @xs:min-h-[480px] @sm:min-h-[480px]"
      >
        <div class="w-full">
          <BlogPostCardImage :article="props.article" :format="'column'" />
        </div>

        <div class="h-full w-full">
          <BlogPostCardText
            :article="props.article"
            :text-link="props.textLink"
          />
        </div>
      </div>
    </div>
  </SimpleCard>
</template>
