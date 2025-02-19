<script setup lang="ts">
import type { PageSectionsOembedVideoFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsOembedVideoFieldsFragment | null
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
