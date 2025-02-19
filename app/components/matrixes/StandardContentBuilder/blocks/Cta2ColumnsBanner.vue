<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsCtas2ColumnsBannerFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsCtas2ColumnsBannerFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

// const blockClass = computed(() => `block-${props.blockId}`)

const rowClasses = computed(() =>
  props.block?.columnsLayout === 'vertical' ? '' : 'md:flex justify-between',
)

const contentClasses = computed(() =>
  props.block?.columnsLayout === 'vertical'
    ? 'md:columns-2 gap-x-10.5'
    : 'max-w-[570px]',
)

const col1Classes = computed(() =>
  props.block?.columnsLayout === 'vertical' ? '' : 'md:w-[48%]',
)

const col2Classes = computed(() =>
  props.block?.columnsLayout === 'vertical'
    ? 'md:mt-10.5'
    : 'md:w-[45%] md:mt-0',
)

interface BackgroundImage {
  url: string
  position: string
}

interface Backgrounds {
  all: BackgroundImage[]
  desktop: BackgroundImage[]
  mobile: BackgroundImage[]
}

const backgroundStyles = computed(() => {
  const backgrounds: Backgrounds = {
    all: [],
    desktop: [],
    mobile: [],
  }

  /*
  * this snippet has been removed from the fragment: cta2ColumnsBannerFieldsFragment
  *
  * because it was causing an error in Craft CMS GraphQL Engine
  *
  *   backgroundImages {
    ... on backgroundImagesBlock_Entry {
      url
      xOffset
      yOffset
      device
      position
      device
      image {
        ... on media_Asset {
          __typename
          id
          url: url @imagerTransform(width: 300)
          # Transform for base image
          transform_300: url @imagerTransform(width: 300)
          # Transform for 3x resolution
          transform_900: url @imagerTransform(width: 900)
          webpSrcset: url @imagerTransform(handle: "autoWebp")
          srcset: url @imagerTransform(handle: "auto")
          width
          height
          alt
          title
        }
      }
    }
  }
  *
  *
  * */

  // Next code has been removed from the fragment as a consequence of the error

  // props.block?.backgroundImages.forEach((bgImage: any) => {
  //   if (!bgImage.image) return
  //
  //   const imageUrl = `url(${bgImage.image[0]?.url})`
  //   const position = calculatePosition(bgImage)
  //
  //   switch (bgImage.device) {
  //     case 'desktop':
  //       backgrounds.desktop.push({ url: imageUrl, position })
  //       break
  //     case 'mobile':
  //       backgrounds.mobile.push({ url: imageUrl, position })
  //       break
  //     default:
  //       backgrounds.all.push({ url: imageUrl, position })
  //   }
  // })

  return generateBackgroundStyles(backgrounds)
})

// function calculatePosition(bgImage: any): string {
//   let position = bgImage.position || 'center center'
//
//   if (bgImage.xOffset) {
//     const xUnit = bgImage.xOffset.replace(/[0-9.-]/g, '') || 'px'
//     position = position.replace('left', `left ${bgImage.xOffset}${xUnit}`)
//     position = position.replace('right', `right ${bgImage.xOffset}${xUnit}`)
//   }
//
//   if (bgImage.yOffset) {
//     const yUnit = bgImage.yOffset.replace(/[0-9.-]/g, '') || 'px'
//     position = position.replace('top', `top ${bgImage.yOffset}${yUnit}`)
//     position = position.replace('bottom', `bottom ${bgImage.yOffset}${yUnit}`)
//   }
//
//   return position
// }

function generateBackgroundStyles(
  backgrounds: Backgrounds,
): Record<string, string> {
  const styles: Record<string, string> = {}

  if (backgrounds.all.length) {
    styles.backgroundImage = backgrounds.all.map((bg) => bg.url).join(',')
    styles.backgroundPosition = backgrounds.all
      .map((bg) => bg.position)
      .join(',')
  }

  if (backgrounds.desktop.length) {
    styles['@media (min-width: 768px)'] = `
      background-image: ${backgrounds.desktop.map((bg) => bg.url).join(',')};
      background-position: ${backgrounds.desktop.map((bg) => bg.position).join(',')};
    `
  }

  if (backgrounds.mobile.length) {
    styles['@media (max-width: 767px)'] = `
      background-image: ${backgrounds.mobile.map((bg) => bg.url).join(',')};
      background-position: ${backgrounds.mobile.map((bg) => bg.position).join(',')};
    `
  }

  return styles
}

function formatNewlines(text: string) {
  return text ? text.replace(/\n/g, '<br>') : ''
}
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div
      class="cta-2columns-banner large-font-content bg-neutral-text-gray bg-no-repeat py-18 text-white md:py-22"
      :style="backgroundStyles"
    >
      <div class="mx-auto max-w-container-header px-6 md:px-4 2xl:px-0">
        <h3
          v-if="props.block?.primaryText || ''"
          class="heading-3 mb-10.5 md:mb-18"
        >
          {{ props.block?.primaryText }}
        </h3>

        <div :class="rowClasses">
          <div :class="col1Classes">
            <h4
              v-if="props.block?.secondaryText"
              class="heading-4"
              v-html="formatNewlines(props.block?.secondaryText)"
            />

            <div
              v-if="props.block?.contentText"
              class="desc mt-4 whitespace-pre-line md:mt-6"
              :class="contentClasses"
              v-html="props.block?.contentText"
            />

            <NuxtLink
              v-if="props.block?.primaryLink"
              :to="
                props.block?.primaryLink[0]?.linkUri ??
                props.block?.primaryLink[0]?.linkUrl ??
                ''
              "
              class="mt-4 inline-flex h-12 min-h-10 w-full cursor-pointer items-center justify-center rounded-3xl border-2 border-primary bg-white px-4 px-8 py-2 align-middle font-heading text-sm text-xs font-medium leading-tight text-primary transition md:mt-6 md:w-auto md:px-10"
            >
              {{ props.block?.primaryLink[0]?.linkText || '' }}
            </NuxtLink>
          </div>

          <div :class="col2Classes">
            <NuxtImg
              v-if="
                props.block?.image &&
                props.block?.image[0]?.__typename === 'media_Asset'
              "
              :src="props.block?.image[0]?.url || ''"
              :srcset="props.block?.image[0]?.url || ''"
              :alt="
                props.block?.image[0]?.alt ?? props.block?.image[0]?.title ?? ''
              "
              class="h-full w-full rounded-xl object-cover"
              :width="props.block?.image[0]?.width ?? undefined"
              :height="props.block?.image[0]?.height ?? undefined"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
