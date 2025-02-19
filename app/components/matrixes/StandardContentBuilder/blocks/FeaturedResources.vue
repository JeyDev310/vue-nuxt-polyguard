<script setup lang="ts">
import type { PageSectionsFeaturedResourcesFieldsFragment } from '~~/server/codegen'
import ResourceCard from '~/components/resources/ResourceCard.vue'
import ButtonLink from '~/components/common/ButtonLink.vue'

type FeaturedResource =
  PageSectionsFeaturedResourcesFieldsFragment['resources'][0]

interface Props {
  block?: PageSectionsFeaturedResourcesFieldsFragment | null
  layout?: string | null
}

const resourceDivisions: Array<{ __typename: string; title?: string | null }> =
  [
    {
      __typename: 'DivisionA',
      title: 'Marketing',
    },
    {
      __typename: 'DivisionB',
      title: 'Product Development',
    },
  ]

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

function getFirstResourceLink(resource: FeaturedResource): string {
  if (resource?.__typename === 'resourcesFileDownload_Entry') {
    const firstResourceAsset = resource.resourceAssets[0]
    if (!firstResourceAsset) return ''

    if (firstResourceAsset.__typename === 'resources_Asset') {
      return firstResourceAsset.url ?? ''
    }
  } else if (resource?.__typename === 'resourcesPageLink_Entry') {
    const firstResourceLink = resource.resourceLink[0]
    if (!firstResourceLink) return ''

    return firstResourceLink.linkUri ?? ''
  }
  return ''
}

function getResourceAssets(resource: FeaturedResource) {
  if (resource?.__typename === 'resourcesFileDownload_Entry') {
    return [
      {
        __typename: 'AssetType1',
        id: '1',
        url: getFirstResourceLink(resource),
        title: 'Image 1',
        mimeType: 'image/jpeg',
        kind: 'image',
        extension: 'jpg',
      },
      {
        __typename: 'AssetType2',
        id: '2',
        url: getFirstResourceLink(resource),
        title: 'Document 1',
        mimeType: 'application/pdf',
        kind: 'document',
        extension: 'pdf',
      },
    ]
  }
  return undefined
}
</script>

<template>
  <div class="relative bg-primary">
    <div class="relative z-10 px-6 py-20">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex items-center gap-y-10"
          :class="
            props.block?.resources && props.block?.resources.length > 2
              ? 'flex-col'
              : 'flex-row'
          "
        >
          <!-- First Row -->
          <div class="w-full">
            <div class="grid gap-5">
              <div>
                <div class="prose--fancy prose--light prose mb-10">
                  <h4
                    class="font-montserrat text-4xl font-semibold leading-[57.6px] tracking-normal text-white"
                    v-html="props.block?.primaryText"
                  />
                  <p
                    class="w-3/5 pt-1 font-inter text-base font-normal leading-[20.8px] tracking-normal text-white"
                  >
                    {{ props.block?.secondaryText }}
                  </p>
                </div>
              </div>

              <div v-if="props.block?.primaryLink[0]?.linkUri">
                <ButtonLink
                  :to="props.block?.primaryLink[0]?.linkUri"
                  class="relative z-10 inline-flex items-center space-x-2.5"
                  :text="props.block?.primaryLink[0].text || ''"
                  type="secondary"
                  size="xl"
                />
              </div>
            </div>
          </div>

          <!-- Second Row -->
          <div class="w-full">
            <div class="relative">
              <div
                class="grid w-full grid-cols-1 justify-between gap-6"
                :class="
                  props.block?.resources && props.block?.resources.length > 2
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
                "
              >
                <ResourceCard
                  v-for="(resource, index) in props.block?.resources"
                  :key="index"
                  type="fullheadertext"
                  :title="resource?.title || ''"
                  :resource-divisions="resourceDivisions"
                  :__typename="resource?.__typename"
                  :resource-assets="getResourceAssets(resource)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Add any component-specific styles here */
/* Note: Most styles are handled by Tailwind classes */
.slider-cta {
  @apply before:absolute before:inset-0 before:z-10 before:h-full before:w-9/12 before:bg-gradient-to-r before:from-primary-darker before:via-primary-darker after:absolute after:inset-0 after:m-auto after:h-[calc(100%-theme(spacing.4))] after:w-full after:bg-pattern-1 after:opacity-20;

  /* Navigation dedicated horizontal alignment position and custom style to control more in mobile responsive based on design */

  &__control {
    @apply absolute top-1/2 z-20 -translate-y-3/4 transform transition after:content-[''];

    &-prev {
      @apply right-full -mr-5 xl:mr-0;
    }

    &-next {
      @apply left-full -ml-5 xl:ml-0;
    }

    &.swiper-button-disabled {
      @apply opacity-0;
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    img {
      @apply md:scale-70;
    }

    .slider-cta__slider-label {
      @apply hidden;
    }
  }
}
.prose {
  --tw-prose-body: theme('colors.tertiary.darkest');
  --tw-prose-bullets: theme('colors.primary.DEFAULT');

  /* Fancy Heading */
  &--fancy {
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply font-medium;
    }
  }

  /* White text */
  &--light {
    --tw-prose-body: theme('colors.white');
    --tw-prose-headings: theme('colors.white');
    --tw-prose-bold: theme('colors.white');
    --tw-prose-lead: theme('colors.white');
    --tw-prose-bullets: theme('colors.white');
    --tw-prose-links: theme('colors.white');
  }
}
.swiper {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  display: block;
}

.swiper-vertical > .swiper-wrapper {
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  transition-timing-function: var(
    --swiper-wrapper-transition-timing-function,
    initial
  );
  box-sizing: content-box;
}

.swiper-android .swiper-slide,
.swiper-ios .swiper-slide,
.swiper-wrapper {
  transform: translateZ(0);
}

.swiper-horizontal {
  touch-action: pan-y;
}

.swiper-vertical {
  touch-action: pan-x;
}
</style>
