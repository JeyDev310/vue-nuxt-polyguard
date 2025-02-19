<script setup lang="ts">
import type { PageSectionsRichTextFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsRichTextFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})
</script>

<template>
  <!-- <div>
    <div class="relative">{{ props.block?.typeHandle }}</div>
    <pre>{{ props.block }}</pre>
  </div> -->
  <section
    v-if="props.block?.richText"
    class="px-6 py-16"
    :style="{ backgroundColor: props.block?.backgroundColor || undefined }"
  >
    <div class="mx-auto max-w-container">
      <div class="relative mx-auto w-full max-w-article">
        <article
          class="prose max-w-none"
          :class="[
            '[&>table]:table-fixed',
            '[&>table_td]:align-top',
            '[&>table_tr]:!border-0',
            '[&>table_img]:!my-0',
            '[&>table_figure]:!my-0',
          ]"
          v-html="props.block?.richText"
        />
      </div>
    </div>
  </section>
</template>
