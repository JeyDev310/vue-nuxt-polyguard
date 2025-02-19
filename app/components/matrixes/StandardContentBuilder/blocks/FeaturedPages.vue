<script setup lang="ts">
import type { PageSectionsFeaturedPagesFieldsFragment } from '~~/server/codegen'
import MainContainer from '~/components/layout/MainContainer.vue'

interface Props {
  block?: PageSectionsFeaturedPagesFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const bgColor = props.block?.backgroundColor

const sectionClasses = computed(() => {
  return [bgColor === 'gray' ? 'bg-tertiary-lightest' : '']
})

const cleanedPrimaryText = (primaryText: string | null | undefined) => {
  return primaryText
    ? primaryText.replace(/<p>/g, '').replace(/<\/p>/g, '')
    : undefined
}
</script>

<template>
  <section :class="sectionClasses" class="py-32">
    <MainContainer>
      <div class="space-y-6">
        <!-- Primary Text and Link Section -->

        <div class="prose--fancy prose text-left">
          <!-- Dynamic Heading based on primaryTextHeading -->
          <h1
            class="my-0 text-4xl font-medium leading-tight md:text-5xl"
            v-html="cleanedPrimaryText(props.block?.primaryText)"
          />
          <p
            v-if="props.block?.secondaryText"
            v-html="props.block?.secondaryText"
          />
          <a
            v-if="props.block?.primaryLink[0]?.text"
            :href="
              '/' +
              (props.block?.primaryLink[0]?.linkUri || '').replace(/^\/+/, '')
            "
            class="inline-flex min-h-10 cursor-pointer items-center rounded-3xl border-2 border-secondary bg-secondary px-8 py-2 align-middle font-heading text-xs font-medium leading-tight text-white no-underline transition focus:bg-secondary-dark lg:hover:border-secondary-dark lg:hover:bg-secondary-dark"
          >
            {{ props.block?.primaryLink[0].text }}
          </a>
        </div>

        <!-- Card List Section -->
        <div class="w-full">
          <!-- Render grid if more than 2 cards, flex otherwise -->
          <div
            v-if="props.block?.cardList"
            :class="[
              props.block?.cardList.length > 2
                ? 'grid gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-11'
                : 'gap-justify-between flex flex-col gap-8 lg:flex-row',
            ]"
          >
            <CardsSquareTaggedCatalogCard
              v-for="(card, index) in props.block?.cardList"
              :key="index"
              :primary-text="card?.primaryText || ''"
              :secondary-text="card?.secondaryText || ''"
              :card-image="card?.cardImage[0] ?? undefined"
              :card-link="card?.cardLink"
              :card-tags="card?.cardTags || ''"
              :card-style="props.block?.cardStyle || ''"
              :primary-link-text="props.block?.primaryLink"
              :class="'w-full'"
            />
          </div>
        </div>
      </div>
    </MainContainer>
  </section>
</template>

<style scoped lang="scss">
/* Add any custom styles here */
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
</style>
