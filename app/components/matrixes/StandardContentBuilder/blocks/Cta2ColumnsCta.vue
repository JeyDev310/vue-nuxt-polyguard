<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsCtas2ColumnsFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsCtas2ColumnsFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const bgColor = computed(() => props.block?.backgroundColor ?? 'white')
const assetPositioning = computed(() => props.block?.assetPositioning ?? 'left')
// const asset = computed(
//   () => props.block?.asset ?? props.block?.asset[0] ?? null,
// )
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div
      class="cta-2columns-banner block-{{ blockId }} text-gray bg-no-repeat large-font-content px-6 md:px-4 2xl:px-0"
      :class="[
        { 'bg-gray-1': bgColor === 'blue' },
        `pt-${props.block?.paddingTop}`,
        `pb-${props.block?.paddingBottom}`,
      ]"
    >
      <div class="mx-auto max-w-container">
        <div
          class="justify-between md:flex"
          :class="{ 'md:flex-row-reverse': assetPositioning === 'right' }"
        >
          <div
            class="md:w-1/2"
            :class="{
              'md:pl-18': assetPositioning === 'right',
              'md:pr-18': assetPositioning !== 'right',
            }"
          >
            <picture
              v-if="
                props.block?.asset[0] &&
                props.block?.asset[0]?.kind === 'image' &&
                props.block?.asset[0]?.__typename === 'media_Asset'
              "
            >
              <img
                class="h-full w-full rounded-xl object-cover"
                :src="props.block?.asset[0]?.url ?? undefined"
                :sizes="'auto'"
                :srcset="
                  props.block?.asset
                    .map((t: any) => `${t?.url} ${t?.width}w`)
                    .join(', ')
                "
                :width="props.block?.asset[0]?.width ?? undefined"
                :height="props.block?.asset[0]?.height ?? undefined"
                loading="lazy"
                :alt="
                  props.block?.asset[0]?.alt ??
                  props.block?.asset[0]?.title ??
                  ''
                "
              />
            </picture>
            <CardsVideoCard
              v-else
              :title="props.block?.asset[0]?.title ?? ''"
              :thumbnail="{}"
              :video-asset-id="props.block?.asset[0]?.id ?? ''"
              :big-font="true"
              :embedded-asset="props.block?.asset[0]?.embeddedAsset"
            />
          </div>
          <div class="mt-6 text-text-gray md:mt-0 md:w-1/2">
            <img
              v-if="
                props.block?.primaryImage &&
                props.block?.primaryImage[0]?.__typename === 'media_Asset'
              "
              :src="props.block?.primaryImage[0]?.url ?? undefined"
            />
            <h3
              v-if="props.block?.primaryText"
              class="heading-3 leading-12 mb-4 md:mb-9"
              v-html="props.block?.primaryText"
            />
            <div
              v-if="props.block?.contentText"
              class="desc mt-4 max-w-[588px] whitespace-pre-line md:mt-9"
              v-html="props.block?.contentText"
            />
            <div v-if="props.block?.primaryLink">
              <NuxtLink
                :to="props.block?.primaryLink[0]?.link || ''"
                class="mt-4 inline-flex min-h-10 w-full cursor-pointer items-center justify-center rounded-3xl border-2 border-primary bg-primary !px-[60px] px-8 py-2 align-middle font-heading text-xs font-medium leading-tight text-white transition focus:bg-primary-dark md:mt-9 md:w-auto lg:hover:border-primary-dark lg:hover:bg-primary-dark"
                :target="props.block?.primaryLink[0]?.target"
              >
                <div class="font-heading text-xs font-medium text-white">
                  {{ props.block?.primaryLink[0]?.linkText }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.large-font-content {
  .heading-3,
  h3 {
    font-size: 28px;
    line-height: 40px;
    @screen md {
      font-size: 42px;
      line-height: 60.5px;
    }
  }
  .heading-4,
  h4 {
    font-size: 24px;
    line-height: 39px;
    @screen md {
      font-size: 28px;
      line-height: 48px;
    }
  }
  li,
  p {
    font-size: 14px;
    line-height: 1.4;
    @screen md {
      font-size: 18px;
    }
  }
  br {
    display: none;
  }
  table {
    tr {
      td {
        font-size: 18px;
        line-height: 32px;
        @apply leading-8;
        h5 {
          font-size: 28px;
          line-height: 53px;
        }
      }
    }
  }
}
</style>
