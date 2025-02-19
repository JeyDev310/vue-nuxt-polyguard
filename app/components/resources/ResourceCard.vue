<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ButtonWithIcon from '~/components/common/ButtonWithIcon.vue'

interface Props {
  title?: string | null
  type?: string | null
  resourceDivisions?: Array<{ __typename: string; title?: string | null }>
  __typename?: string | null
  resourceAssets?: Array<{
    __typename: string
    id?: string | null
    url?: string | null
    title?: string | null
    mimeType?: string | null
    extension: string
  }>
}

const props = defineProps<Props>()

const elementRef = ref<HTMLElement | null>(null)
const elementWidth = ref(0)

const updateWidth = () => {
  if (elementRef.value) {
    elementWidth.value = elementRef.value.offsetWidth
  }
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div
    ref="elementRef"
    class="flex w-full space-x-0 rounded-lg border border-custom-blue bg-primary-light p-4"
    :class="
      elementWidth === 0
        ? 'invisible'
        : elementWidth < 750
          ? 'visible flex-col space-y-8'
          : 'visible flex-row space-x-8'
    "
  >
    <div
      class="flex items-center"
      :class="
        props.type === 'fullheadertext' ? 'w-full' : 'w-full md:w-3/5 lg:w-1/3'
      "
    >
      <div class="h-[24] w-[24]">
        <svg
          width="24"
          height="30"
          viewBox="0 0 24 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.49963 28.5C2.84278 28.5 1.49963 27.1569 1.49963 25.5V1.5H14.9996L22.4996 9V25.5C22.4996 27.1569 21.1565 28.5 19.4996 28.5H4.49963Z"
            stroke="#348EF2"
            stroke-width="1.4026"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5004 1.5V10.5H22.5004"
            stroke="#348EF2"
            stroke-width="1.4026"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 16.4999H16.5"
            stroke="#348EF2"
            stroke-width="1.4026"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 22.5H16.5"
            stroke="#348EF2"
            stroke-width="1.4026"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        :class="
          props.type === 'fullheadertext'
            ? 'montserrat ml-5 w-full whitespace-normal break-words text-base tracking-normal'
            : 'montserrat ml-5 overflow-hidden text-ellipsis whitespace-nowrap text-base tracking-normal'
        "
      >
        {{ props.title }}
      </div>
    </div>

    <div class="mt-6 flex flex-1 items-center justify-between md:mt-0">
      <div class="flex w-full space-x-4">
        <ul class="flex flex-wrap items-center">
          <li
            v-for="(division, index) in props.resourceDivisions"
            :key="index"
            class="mr-2 mt-1 flex items-center rounded-md bg-white p-1 font-montserrat"
          >
            <span
              class="py-0.3 montserrat px-2 text-[12px] font-medium tracking-normal text-[#106ED6]"
            >
              {{ division.title }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-6 flex flex-1 items-center justify-between md:mt-0">
      <div class="w-full text-right md:mt-0">
        <div
          v-if="props.__typename === 'resourcesFileDownload_Entry'"
          class="flex flex-wrap gap-x-2 gap-y-2"
          :class="elementWidth > 750 ? 'justify-end' : 'justify-start'"
        >
          <ButtonWithIcon
            v-for="(asset, index) in props.resourceAssets"
            :key="index"
            :to="asset.url || undefined"
            :title="'Download ' + asset.extension + ' for ' + props.title"
            :extension="asset.extension"
            class="rounded-3xl bg-[#60b8b8] px-6 py-2 text-sm font-medium text-white"
            target="_blank"
          />
        </div>
        <div v-else-if="props.__typename === 'resourcesPageLink_Entry'">
          pageLink_Entry
        </div>
      </div>
    </div>
  </div>
</template>
