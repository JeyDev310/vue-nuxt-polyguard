<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  minQty?: number
  maxQty?: number
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  minQty: 1,
  maxQty: 9999,
  modelValue: 1,
})

interface Emits {
  (event: 'update:modelValue', value: number): boolean
}

const emit = defineEmits<Emits>()

const quantity = ref<number>(1)

if (quantity.value < props.minQty) {
  updateQuantity(props.minQty)
}

watch(
  () => props.modelValue,
  (value) => {
    updateQuantity(value)
  },
)

const addQuantity = () => {
  const _value = quantity.value + 1
  updateQuantity(_value)
}

const subtractQuantity = () => {
  const _value = quantity.value - 1
  updateQuantity(_value)
}

function updateQuantity(value: number) {
  quantity.value = normalizeValue(value)
  emit('update:modelValue', quantity.value)
}

function onBlur(event: FocusEvent) {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    const intValue = normalizeValue(toInt(target.value))
    updateQuantity(intValue)
    target.value = intValue.toString()
  }
}

function toInt(value: string | number) {
  let _value: number

  if (typeof value === 'string') {
    _value = parseInt(value)
  } else {
    _value = value
  }

  if (isNaN(_value)) {
    return 0
  }

  // return an integer always with Math.floor
  return Math.floor(_value)
}

function normalizeValue(value: number) {
  if (value < props.minQty) {
    return toInt(props.minQty)
  }

  if (value > props.maxQty) {
    return toInt(props.maxQty)
  }

  return toInt(value)
}
</script>

<template>
  <div class="flex flex-row items-center space-x-2">
    <button
      class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-white hover:bg-gray-300"
      @click.prevent="subtractQuantity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
      </svg>
    </button>
    <input
      type="text"
      :value="quantity"
      class="h-8 w-11 rounded-md border border-gray-300 px-1 text-center text-sm font-semibold text-gray-700"
      @blur="onBlur"
    />
    <button
      class="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark"
      @click.prevent="addQuantity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v12m6-6H6"
        />
      </svg>
    </button>
  </div>
</template>
