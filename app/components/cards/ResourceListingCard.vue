<script lang="ts" setup>
interface Props {
  resource?: {
    id: string
    title: string
    resourceThumbnail: Array<{
      url: string
    }>
    resourceDivisions: Array<{
      title: string
    }>
    resourceAssets: Array<{
      id: string
      url: string
      isEmbedded: boolean
      providerIcon: string
      providerName: string
      extension: string
    }>
  } | null
}

const props = withDefaults(defineProps<Props>(), {
  resource: () => ({
    id: '',
    title: '',
    resourceThumbnail: [{ url: '' }],
    resourceDivisions: [{ title: '' }],
    resourceAssets: [],
  }),
})
</script>

<template>
  <div class="flex gap-5">
    <!-- Image Section -->
    <div class="flex-none">
      <img
        :src="
          props.resource?.resourceThumbnail?.[0]?.url ||
          '/svg/resources-download.svg'
        "
        width="109"
        height="140"
        alt="Resources download"
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-1 items-center">
      <div class="space-y-4">
        <!-- Title and Division -->
        <div class="grid gap-1">
          <ul class="flex items-center font-heading text-xs font-medium">
            <li
              class="flex items-center after:mx-2 after:block after:h-1 after:w-1 after:flex-none after:rounded-full after:bg-primary after:content-[''] last:after:hidden"
            >
              {{ props.resource?.resourceDivisions?.[0]?.title }}
            </li>
          </ul>
          <div>{{ props.resource?.title }}</div>
        </div>

        <!-- Resource Assets -->
        <div class="flex flex-wrap gap-3">
          <template
            v-for="asset in props.resource?.resourceAssets"
            :key="asset.id"
          >
            <!-- Embedded Asset -->
            <a
              v-if="asset.isEmbedded"
              :href="asset.url"
              target="_blank"
              class="button--md inline-flex h-12 min-h-10 cursor-pointer items-center rounded-3xl border-2 border-primary bg-white px-5 py-2 align-middle font-heading text-sm font-medium uppercase leading-tight text-primary transition md:px-10"
            >
              <img
                v-if="asset.providerIcon"
                :src="asset.providerIcon"
                :alt="asset.providerName"
                class="mr-2 max-h-4 object-contain"
                width="16"
                height="16"
              />
              {{ asset.providerName }}
            </a>

            <!-- Regular Asset -->
            <a
              v-else
              :href="asset.url"
              target="_blank"
              :class="[
                'button button--md uppercase',
                asset.extension === 'dwg'
                  ? 'button--primary button--bold'
                  : 'button--secondary',
              ]"
            >
              {{ asset.extension }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
