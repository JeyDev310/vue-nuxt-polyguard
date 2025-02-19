<script lang="ts" setup>
interface Props {
  authorImageUrl?: string | null
  authorName?: string | null
  postDate?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  authorImageUrl: '',
  authorName: '',
  postDate: '',
})
</script>

<template>
  <div class="mb-3.5 flex flex-row gap-x-2">
    <div class="flex flex-row items-center justify-center">
      <NuxtImg
        class="!my-0 inline-block h-8 w-8 rounded-full"
        :src="props.authorImageUrl ?? ''"
        :alt="props.authorName ?? ''"
      />
    </div>
    <div class="flex flex-col items-start justify-center">
      <div class="text-sm font-normal">
        {{ props.authorName }}
      </div>
      <div class="text-sm font-light text-gray-500">
        {{ props.postDate }}
      </div>
    </div>
  </div>
</template>
