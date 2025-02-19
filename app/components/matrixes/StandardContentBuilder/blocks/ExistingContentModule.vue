<script setup lang="ts">
import type { PageSectionsExistingContentModuleFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsExistingContentModuleFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})
</script>

<template>
  <section>
    <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre>
  </section>
</template>
