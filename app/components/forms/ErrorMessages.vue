<script setup lang="ts">
interface IProps {
  errors?: string[]
}

const props = withDefaults(defineProps<IProps>(), {
  errors: () => [],
})
</script>

<template>
  <div v-if="props.errors.length > 0" class="my-8">
    <ul>
      <li
        v-for="(error, index) in props.errors"
        :key="index"
        class="my-2 rounded border border-red-500 bg-red-100 px-4 py-2 font-semibold text-red-500"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>
