<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsAlternateContentFieldsFragment } from '~~/server/codegen'
import MainContainer from '~/components/layout/MainContainer.vue'

interface Props {
  block?: PageSectionsAlternateContentFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const blockId = computed(() => 1)

const sectionClasses = computed(() => {
  return props.block?.primaryText || props.block?.secondaryText
    ? ['pt-10 md:pt-22 pb-10.5 md:pb-18']
    : ['pb-18 md:pb-30']
})

const processBackgroundImages = computed(() => {
  const alldevUrls: string[] = []
  const alldevPositions: string[] = []
  const desktopUrls: string[] = []
  const desktopPositions: string[] = []
  const mobileUrls: string[] = []
  const mobilePositions: string[] = []

  props.block?.sectionsAlternateContentBackgroundImages.forEach((bgImage) => {
    const { image, xOffset, yOffset, device } = bgImage || {}
    let position = bgImage?.position || 'center center'

    if (xOffset) {
      const xUnit = xOffset.replace(/[0-9.]/g, '')
      const xOffsetWithUnit = xOffset + (xUnit ? '' : 'px')
      position = position.replace('left', `left ${xOffsetWithUnit}`)
      position = position.replace('right', `right ${xOffsetWithUnit}`)
    }

    if (yOffset) {
      const yUnit = yOffset.replace(/[0-9.]/g, '')
      const yOffsetWithUnit = yOffset + (yUnit ? '' : 'px')
      position = position.replace('top', `top ${yOffsetWithUnit}`)
      position = position.replace('bottom', `bottom ${yOffsetWithUnit}`)
    }

    if (image && image[0]?.__typename === 'media_Asset') {
      const imageUrl = `url(${image[0]?.url})`
      switch (device) {
        case 'desktop':
          desktopUrls.push(imageUrl)
          desktopPositions.push(position)
          break
        case 'mobile':
          mobileUrls.push(imageUrl)
          mobilePositions.push(position)
          break
        default:
          alldevUrls.push(imageUrl)
          alldevPositions.push(position)
      }
    }
  })

  return {
    alldevUrls,
    alldevPositions,
    desktopUrls,
    desktopPositions,
    mobileUrls,
    mobilePositions,
  }
})

const getFlexClasses = (
  row: {
    imagePositioning?: string | null
    columnsLayout?: string | null
  },
  index: number,
) => {
  const flexClasses = ['flex-col']

  if (row.imagePositioning === 'reversed') {
    flexClasses.push('md:flex-col-reverse')
  }

  if (row.columnsLayout === '2-col') {
    const flexOrder =
      index % 2 === 0
        ? row.imagePositioning === 'reversed'
          ? 'md:flex-row'
          : 'md:flex-row-reverse'
        : row.imagePositioning === 'reversed'
          ? 'md:flex-row-reverse'
          : 'md:flex-row'

    flexClasses.push(flexOrder)
    flexClasses.push(index > 0 ? 'mt-8 md:mt-14' : '')
    flexClasses.push(
      index === 0 && !props.block?.primaryText ? 'pt-12 md:pt-18' : '',
    )
  }

  if (row.columnsLayout === '1-col') {
    flexClasses.push(
      row.imagePositioning === 'reversed'
        ? ''
        : index > 0
          ? 'pt-10.5 md:pt-18'
          : 'pt-10.5 md:pt-20',
    )
  }

  flexClasses.push(`row-${row.columnsLayout}`)
  return flexClasses.filter(Boolean).join(' ')
}

const bgColor = computed(() => props.block?.backgroundColor ?? 'white')
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <MainContainer>
      <div
        :class="[
          'alternateContentSection',
          `block-${blockId}`,
          'bg-no-repeat',
          'large-font-content',
          ...sectionClasses,
          'text-text-gray',
          { 'bg-gray-1': bgColor === 'lightBlue' },
        ]"
      >
        <div class="mx-auto max-w-container-header px-6 md:px-4 2xl:px-0">
          <div
            v-if="props.block?.primaryText"
            class="primary-text mx-auto mb-10.5 mt-8 max-w-[969px] text-left text-primary md:mb-18 md:text-center"
          >
            <h2
              :class="{
                'my-0 text-4xl font-medium leading-tight md:text-5xl':
                  props.block?.primaryTextHeading === 'h1',
                'heading-3': props.block?.primaryTextHeading !== 'h1',
              }"
              v-html="props.block?.primaryText"
            />
          </div>

          <div
            v-if="props.block?.secondaryText"
            class="secondary-text prose max-w-none"
            v-html="props.block?.secondaryText"
          />
        </div>

        <div class="alternate-content">
          <div class="mx-auto max-w-container-header px-6 md:px-4 2xl:px-0">
            <div class="w-full">
              <div
                v-for="(
                  row, index
                ) in props.block?.sectionsAlternateContent.filter(
                  (r) => r !== null && r !== undefined,
                )"
                :key="index"
                :class="[
                  'flex',
                  'items-center',
                  'justify-center',
                  'w-full',
                  getFlexClasses(row, index),
                  row?.columnsLayout === '2-col' ? 'gap-4 md:gap-10' : '',
                ]"
              >
                <div
                  :class="[
                    'w-full',
                    row?.columnsLayout === '2-col' ? 'md:w-1/2' : '',
                  ]"
                >
                  <picture v-if="row?.image[0]">
                    <img
                      v-if="
                        row?.image[0] &&
                        row?.image[0]?.__typename === 'media_Asset'
                      "
                      :class="[
                        'object-cover',
                        'w-full',
                        'h-full',
                        'rounded-lg',
                        {
                          'mt-10.5':
                            row?.columnsLayout === '1-col' &&
                            row?.imagePositioning === 'reversed',
                          'mt-10.5 md:mt-0':
                            row?.columnsLayout === '1-col' &&
                            row?.imagePositioning !== 'reversed',
                        },
                      ]"
                      :src="row?.image[0]?.url || undefined"
                      :sizes="row?.image[0]?.size || 'auto'"
                      :srcset="row?.image[0]?.url || undefined"
                      :width="row?.image[0]?.width || undefined"
                      :height="row?.image[0]?.height || undefined"
                      loading="lazy"
                      :alt="row?.image[0]?.alt ?? row?.image[0].title ?? ''"
                    />
                  </picture>
                </div>

                <div
                  :class="[
                    'w-full',
                    row?.columnsLayout === '2-col' ? 'md:w-1/2' : '',
                  ]"
                >
                  <div
                    v-if="row?.richText"
                    class="prose max-w-none"
                    v-html="row?.richText"
                  />

                  <NuxtLink
                    v-if="row?.primaryLink[0]?.linkText"
                    :to="row?.primaryLink[0]?.url || ''"
                    :class="[
                      'leading-tighttransition inline-flex h-12 min-h-10 w-full cursor-pointer items-center justify-center rounded-3xl border-2 border-primary bg-white px-4 py-2 align-middle font-heading text-sm text-xs font-medium text-primary md:w-auto md:px-10',
                      row?.columnsLayout === '2-col' ? 'mt-4 md:mt-6' : 'mt-3',
                    ]"
                  >
                    {{ row?.primaryLink[0]?.linkText }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  </section>
</template>

<style lang="scss" scoped>
.alternateContentSection.block-1 {
  background-image: v-bind('processBackgroundImages.alldevUrls.join(",")');
  background-position: v-bind(
    'processBackgroundImages.alldevPositions.join(",")'
  );
}

@media (min-width: 768px) {
  .alternateContentSection.block-1 {
    background-image: v-bind('processBackgroundImages.desktopUrls.join(",")');
    background-position: v-bind(
      'processBackgroundImages.desktopPositions.join(",")'
    );
  }
}

@media (max-width: 767px) {
  .alternateContentSection.block-1 {
    background-image: v-bind('processBackgroundImages.mobileUrls.join(",")');
    background-position: v-bind(
      'processBackgroundImages.mobilePositions.join(",")'
    );
  }
}
</style>
