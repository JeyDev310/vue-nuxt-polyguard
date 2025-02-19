<script setup lang="ts">
import { ref, watch, toRefs } from '#imports'
import type { BigcommerceProductOptions } from '#shared/types'

interface Props {
  options?: BigcommerceProductOptions
  modelValue?: Record<string, number>
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: () => ({}),
})

interface Emits {
  (event: 'update:modelValue', selectedOptions: Record<string, number>): void
}

const emit = defineEmits<Emits>()

const { modelValue } = toRefs(props)
const selectedOptions = ref<Record<string, number>>(modelValue.value)

const filteredOptions = computed(() => {
  return (props.options ?? [])
    .filter((option) => option !== null && option !== undefined)
    .filter((option) => option.type === 'dropdown')
    .map((option) => {
      return {
        ...option,
        id: option.id ?? '',
        name: option.name ?? '',
        optionValues: (option.optionValues ?? [])
          .filter(
            (optionValue) => optionValue !== null && optionValue !== undefined,
          )
          .map((optionValue) => {
            return {
              ...optionValue,
              id: optionValue.id ?? 0,
            }
          }),
      }
    })
})

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = newValue
  },
)

function changeOptionValue(optionGroupId: string | number, event: Event) {
  if (event.target instanceof HTMLSelectElement) {
    const optionValueId = event.target.value
    selectedOptions.value[optionGroupId] = parseInt(optionValueId)
    emit('update:modelValue', selectedOptions.value)
  }
}
</script>

<template>
  <div class="w-full max-w-96 space-y-4">
    <div v-for="option in filteredOptions" :key="option.id">
      <div class="input-wrap">
        <div>
          <label :for="option.name">{{ option.displayName }}</label>
        </div>
        <div v-if="option.type === 'dropdown'">
          <select
            v-model="selectedOptions[option.id]"
            :name="option.name"
            class="input-form input-form--select"
            @change="changeOptionValue(option.id, $event)"
          >
            <option
              v-for="value in option.optionValues"
              :key="value.id"
              :value="value.id"
            >
              {{ value.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrap:not(.input-wrap--checkbox) {
  @apply grid gap-1;

  label {
    @apply inline-block select-none indent-6 text-sm font-medium leading-tight text-gray-600;

    /* Asterisk */
    span {
      @apply pl-1 text-red-600;
    }
  }
}

.input-wrap--checkbox {
  @apply flex space-x-3;

  label {
    @apply inline-block select-none text-sm leading-tight;
  }
}

.input-form {
  /* This will remove properly input focus box-shadow/ring */
  &:focus {
    box-shadow: none;
    --tw-ring-shadow: none;
  }

  &--search,
  &--select,
  &--textarea,
  &--text {
    /* `outline-none` will remove flicker when focusing the input */
    @apply min-h-12 w-full rounded-forminput border border-tertiary-light bg-white px-6 py-2 text-sm text-tertiary placeholder-tertiary/70 outline-none transition focus:border-primary;
  }

  &--search,
  &--textarea,
  &--text {
    @apply font-bold text-primary placeholder:font-normal;
  }

  &--search {
    @apply pr-14;

    /* Hide the native search icon */
    &:enabled:read-write:-webkit-any(
        :focus,
        :hover
      )::-webkit-search-cancel-button,
    &::-webkit-search-cancel-button {
      @apply hidden h-0 w-0;
    }
  }

  /* Input Select */
  &--select {
    @apply bg-chevron-select pl-7 pr-14;
    /* Custom select icon size */
    background-size: 0.375rem 0.25rem;
    /* Custom select icon position */
    background-position: right 1.5rem center;

    &-hasvalue {
      @apply font-bold text-primary;
    }

    &--small {
      @apply min-h-10 pl-5 pr-10 text-xs;
    }
  }

  /* Input Textarea */
  &--textarea {
    @apply min-h-40 py-6;
  }

  /* Checkbox */
  &--checkbox {
    --tw-ring-inset: none;
    --tw-ring-color: none;
    --tw-ring-shadow: none;
    @apply border-tertiary text-primary hover:border-2 hover:border-primary focus:border-primary focus:shadow-none;
  }

  /* white background `input-form--inputwhite` */
  &--inputwhite {
    @apply bg-white;
  }

  &--text-xs {
    @apply text-xs;
  }
}
</style>
