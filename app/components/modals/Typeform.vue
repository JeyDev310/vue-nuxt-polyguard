<script setup lang="ts">
import type { PageHeroTypeformFieldsFragment } from '~~/server/codegen'
import { watch, useModalsStore } from '#imports'
import { toKebabCase } from '~/utils'
import { kebabCase } from 'scule'

const modalsStore = useModalsStore()

interface Props {
  block?: PageHeroTypeformFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

// Watch for modal visibility changes
watch(
  () => modalsStore.showTypeformModal,
  (newValue) => {
    if (newValue) {
      executeEmbedScript()
    }
  },
)

const sectionClasses = computed(() => {
  return [toKebabCase(props.block?.typeHandle)]
})

const extraClasses = computed((): string => {
  const classes = ['page-hero']
  if (props.block?.typeHandle) {
    classes.push(kebabCase(props.block?.typeHandle))
  } else {
    classes.push('unknown')
  }

  return classes.join(' ')
})

function closeModal() {
  modalsStore.setIsTypeformModalOpen(false)
  const existingScript = document.querySelector(
    'script[src="//embed.typeform.com/next/embed.js"]',
  )
  existingScript?.remove()
}

async function executeEmbedScript() {
  const existingScript = document.querySelector(
    'script[src="//embed.typeform.com/next/embed.js"]',
  )
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.onerror = () => {
      console.error('Failed to load Typeform script')
    }
    document.body.appendChild(script)
  } else {
    existingScript.remove()
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    document.body.appendChild(script)
  }
}
</script>

<template>
  <section :class="extraClasses">
    <!-- <div class="relative">{{ props.block?.typeHandle }}</div>
    <div>{{ props.block }}</div> -->
    <Teleport v-if="modalsStore.showTypeformModal" to="body">
      <div class="tf-v1-popup">
        <div
          class="tf-v1-iframe-wrapper"
          style="
            opacity: 1;
            width: calc(100% - 80px);
            height: calc(100% - 80px);
          "
        >
          <div class="modal-content" :class="sectionClasses">
            <div
              data-tf-widget="pr6F9ict"
              data-tf-opacity="100"
              data-tf-iframe-props="title=Polyguard Homepage | Which Division Do You Need?"
              data-tf-transitive-search-params
              data-tf-medium="snippet"
              style="width: 100%; height: 500px"
            ></div>
          </div>
          <button class="tf-v1-close" @click="closeModal">&times;</button>
        </div>
      </div>
    </Teleport>
    <!-- <div :class="sectionClasses" v-html="props.block?.typeformCode" /> -->
  </section>
</template>

<style scoped lang="scss">
.tf-v1-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  transition: opacity 0.25s ease-in-out;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tf-v1-popup .tf-v1-iframe-wrapper {
  position: relative;
  transition: opacity 0.25s ease-in-out;
  min-width: 360px;
  min-height: 360px;
}
.tf-v1-close {
  display: block;
  padding: 0;
  margin: 0;
  position: absolute;
  font-size: 32px;
  font-weight: normal;
  line-height: 24px;
  width: 24px;
  height: 24px;
  text-align: center;
  text-transform: none;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.25s ease-in-out;
  text-decoration: none;
  color: #000;
  top: -34px;
  right: 0;
  background: none;
  border: none;
  border-radius: 0;
}
@media (min-width: 481px) {
  .tf-v1-popup .tf-v1-close {
    color: #fff !important;
  }
}
.modal-content {
  margin-top: 20px;
}
</style>
