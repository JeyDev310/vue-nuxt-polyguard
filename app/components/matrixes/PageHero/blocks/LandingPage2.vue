<script setup lang="ts">
import type { PageHeroLandingPageFieldsFragment } from '~~/server/codegen'
import { computed, useModalsStore, useRoute } from '#imports'
import { kebabCase } from 'scule'

import ButtonLink from '~/components/common/ButtonLink.vue'
import MainContainer from '~/components/layout/MainContainer.vue'
import ButtonAction from '~/components/common/ButtonAction.vue'

interface Props {
  block?: PageHeroLandingPageFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const modalsStore = useModalsStore()

const extraClasses = computed((): string => {
  const classes = ['page-hero']
  if (props.block?.typeHandle) {
    classes.push(kebabCase(props.block?.typeHandle))
  } else {
    classes.push('unknown')
  }

  return classes.join(' ')
})

const route = useRoute()

const isHomepage = computed(() => route.path === '/')

function handleClick(event: { preventDefault: () => void }) {
  event.preventDefault() // Prevent the default link navigation
  openModal() // Call your modal function
}

function openModal() {
  // Logic to open the modal
  modalsStore.setIsTypeformModalOpen(true)
}
</script>

<template>
  <section class="relative z-0" :class="extraClasses">
    <!-- Background Main -->
    <div
      class="absolute inset-0 z-0 m-auto h-full w-full before:absolute before:inset-0 before:z-10 before:m-auto before:h-full before:w-full before:bg-black before:opacity-20 after:absolute after:inset-0 after:m-auto after:h-full after:w-full after:bg-gradient-to-tr after:from-black after:opacity-60 after:content-['']"
    >
      <picture
        v-if="
          props.block?.backgroundImage &&
          props.block?.backgroundImage[0]?.__typename === 'media_Asset'
        "
        class="h-full w-full"
      >
        <NuxtImg
          :src="props.block?.backgroundImage[0]?.url ?? undefined"
          :srcset="props.block?.backgroundImage[0]?.srcset"
          sizes="100vw"
          class="h-full w-full object-cover"
          :width="props.block?.backgroundImage[0]?.width ?? undefined"
          :height="props.block?.backgroundImage[0]?.height ?? undefined"
          alt=""
        />
      </picture>
    </div>

    <div class="relative z-10">
      <MainContainer>
        <!-- Content -->
        <div
          class="flex h-[600px] flex-col items-start justify-center space-y-8 text-white md:h-[692px]"
        >
          <div class="max-w-prose space-y-6">
            <h1
              v-if="props.block?.primaryText"
              class="inline-block font-montserrat text-3xl font-semibold !leading-tight text-white sm:text-4xl md:text-5xl"
            >
              {{ props.block?.primaryText }}
            </h1>
            <p
              v-if="props.block?.secondaryText"
              class="font-inter text-base font-light text-white sm:text-lg md:text-xl"
            >
              {{ props.block?.secondaryText }}
            </p>
          </div>

          <div v-if="isHomepage">
            <ButtonAction text="Find Your Solution" @click="handleClick" />
          </div>

          <div
            v-else-if="
              props.block?.primaryLink &&
              (props.block?.primaryLink[0]?.linkUri ||
                props.block?.primaryLink[0]?.linkUrl)
            "
          >
            <ButtonLink
              :to="
                props.block?.primaryLink[0]?.linkUri ||
                props.block?.primaryLink[0]?.linkUrl ||
                undefined
              "
              :text="props.block?.primaryLink[0].text || ''"
              size="lg"
            />
          </div>
        </div>
      </MainContainer>
    </div>
  </section>
</template>
