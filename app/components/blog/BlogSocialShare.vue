<script setup lang="ts">
import { computed, useRoute } from '#imports'
import { ShareNetwork } from 'vue3-social-sharing'

interface Props {
  url?: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  title: '',
  description: '',
})

const route = useRoute()

const postUrl = computed((): string => 'https://www.polyguard.com' + route.path)
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center space-x-3">
    <div class="text-sm font-light text-gray-500">Share</div>

    <div v-if="props.url" class="flex items-center gap-4">
      <ShareNetwork
        v-slot="{ share }"
        network="facebook"
        :url="postUrl"
        :title="props.title ?? 'title'"
        :description="description ?? 'description'"
        hashtags="polyguard,blog"
      >
        <CommonIconsFacebook
          class="h-6 w-6 text-blue-500 hover:cursor-pointer"
          aria-hidden="true"
          @click="share"
        />
      </ShareNetwork>
      <ShareNetwork
        v-slot="{ share }"
        network="twitter"
        :url="postUrl"
        :title="props.title ?? 'title'"
        :description="description ?? 'description'"
        hashtags="polyguard,blog"
      >
        <CommonIconsTwitter
          class="h-6 w-6 text-blue-500 hover:cursor-pointer"
          aria-hidden="true"
          @click="share"
        />
      </ShareNetwork>
      <ShareNetwork
        v-slot="{ share }"
        network="linkedin"
        :url="postUrl"
        :title="props.title ?? 'title'"
        :description="description ?? 'description'"
        hashtags="polyguard,blog"
      >
        <CommonIconsLinkedin
          class="h-6 w-6 text-blue-500 hover:cursor-pointer"
          aria-hidden="true"
          @click="share"
        />
      </ShareNetwork>
    </div>
  </div>
</template>
