<script setup lang="ts">
import { computed } from '#imports'
import type { PageSectionsFeaturedCardsFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsFeaturedCardsFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const colsWidthClasses = computed(() => {
  const cardsCount = props.block?.cards.length
  if (cardsCount)
    if (cardsCount > 3) {
      return ['w-full', 'md:w-1/2', 'lg:w-1/4']
    } else if (cardsCount > 2) {
      return ['w-full', 'md:w-1/3']
    } else if (cardsCount > 1) {
      return ['w-full', 'md:w-1/2']
    } else {
      return ['w-full']
    }

  return ['w-full']
})

// Format newlines in text
function formatNewlines(text?: string | null) {
  return text ? text.replace(/\n/g, '<br>') : ''
}
</script>

<template>
  <section>
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre> -->
    <div
      class="featuredCardsSection large-font-content pb-10.5 pt-4 text-left text-text-gray md:pb-18 md:pt-22 md:text-center"
    >
      <div class="mx-auto max-w-container-header px-6 md:px-4 2xl:px-0">
        <div>
          <h3
            v-if="props.block?.primaryText"
            class="primary-text heading-3 mx-auto mb-10.5 mt-8 max-w-container text-left text-primary md:mb-18 md:text-center"
          >
            {{ props.block?.primaryText }}
          </h3>

          <h4
            v-if="props.block?.secondaryText"
            class="secondary-text heading-4"
            v-html="formatNewlines(props.block?.secondaryText)"
          />

          <div
            v-if="props.block?.contentText"
            class="mt-4 !text-text-gray/70 md:mt-6"
            v-html="props.block?.contentText"
          />

          <div
            class="cards mt-6 flex flex-col gap-6 md:mt-10.5 md:flex-row md:gap-10.5"
          >
            <div
              v-for="card in props.block?.cards"
              :key="card?.id ?? undefined"
              :class="colsWidthClasses"
            >
              <CardsCard
                :image="
                  card?.image
                    .filter((img) => img !== undefined && img !== null)
                    .filter((img) => img.__typename === 'media_Asset')
                    .map((img) => {
                      return {
                        url: img?.url ?? '',
                        width: img?.width ?? 0,
                        height: img?.height ?? 0,
                      }
                    }) ?? undefined
                "
                :rich-text="card?.richText ?? undefined"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
