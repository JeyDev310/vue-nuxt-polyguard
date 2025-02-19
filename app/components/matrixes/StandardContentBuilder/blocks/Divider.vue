<script setup lang="ts">
import type { PageSectionsDividerFieldsFragment } from '~~/server/codegen'
import { computed } from '#imports'
import { toKebabCase } from '~/utils'

interface Props {
  block?: PageSectionsDividerFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const sectionClasses = computed(() => {
  return [toKebabCase(props.block?.typeHandle)]
})
</script>

<template>
  <!-- <section>
    <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre>
  </section> -->
  <hr
    class="border-t-2 border-tertiary-light border-opacity-50"
    :class="sectionClasses"
  />
</template>
