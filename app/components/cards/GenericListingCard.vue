<script lang="ts" setup>
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'

interface Props {
  title?: string
  section?: string
  handle?: string
  excerptText?: string
  url?: string
  disableLineClamping?: boolean
  resourceAssets?: Array<{
    url: string
    extension: string
  }>
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  section: '',
  handle: '',
  excerptText: '',
  url: '',
  disableLineClamping: false,
  resourceAssets: () => [],
})

// Compute formatted excerpt with newlines converted to <br> tags
const formattedExcerpt = computed(() => {
  if (!props.excerptText) return ''
  return props.excerptText.replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="flex space-x-2 items-start">
    <div class="w-[16px] h-[16px]">
      <QuestionMarkCircleIcon class="text-[#9FACBA]" />
    </div>
    <div class="space-y-2">
      <div>
        <h5 class="font-semibold text-[18px] leading-tight tracking-normal">{{ title }}</h5>
      </div>
      <div>
        <p
          class="font-normal text-[16px] leading-[20.8px] tracking-normal text-text-grey"
          v-html="formattedExcerpt"
        />
      </div>
      <div v-if="url">
        <template v-if="handle !== 'resources'">
          <div>
            <NuxtLink :to="url" class="button button--primary button--md">
              Read More
            </NuxtLink>
          </div>
        </template>
        <template v-else>
          <div v-if="resourceAssets?.length" class="flex gap-3">
            <a
              v-for="(asset, index) in resourceAssets"
              :key="asset.url"
              :href="asset.url"
              :class="[
                'button',
                'button--md',
                'uppercase',
                index === 0 ? 'button--primary' : 'button--secondary',
              ]"
            >
              {{ asset.extension }}
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
