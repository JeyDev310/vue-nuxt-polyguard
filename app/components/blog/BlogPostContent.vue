<script setup lang="ts">
interface Props {
  htmlContent?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  htmlContent: '',
})
</script>

<template>
  <div class="blog-post-content flex justify-center">
    <article class="html-content" v-html="props.htmlContent" />
  </div>
</template>

<style lang="scss" scoped>
.blog-post-content :deep(.html-content) {
  @apply prose;
  @apply prose-gray;
  @apply font-light;
  @apply font-inter;
  @screen lg {
    @apply prose-lg;
  }

  @apply prose-strong:font-inter;

  @apply prose-h1:font-montserrat;
  @apply prose-h2:font-montserrat;
  @apply prose-h3:font-montserrat;
  @apply prose-h4:font-montserrat;
  @apply prose-h5:font-montserrat;
  @apply prose-h6:font-montserrat;
  @apply prose-h1:font-normal;
  @apply prose-h2:font-normal;
  @apply prose-h3:font-normal;
  @apply prose-h4:font-normal;
  @apply prose-h5:font-normal;
  @apply prose-h6:font-normal;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply prose-strong:font-medium;
    @apply prose-strong:font-montserrat;
  }

  @apply prose-p:text-gray-500;

  @apply prose-a:text-primary;

  @apply prose-img:w-full;
  @apply prose-img:rounded-lg;
}
</style>
