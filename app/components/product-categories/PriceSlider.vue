<script setup lang="ts">
import { ref } from '#imports'

const minPrice = ref('500')
const maxPrice = ref('6000')

function slider() {
  if (minPrice.value > maxPrice.value) {
    const tmp = maxPrice.value
    maxPrice.value = minPrice.value
    minPrice.value = tmp
  }
}
</script>

<template>
  <div class="range-slider">
    <div class="flex flex-row justify-between text-left">
      <div class="flex max-w-[90px] flex-col" @change="slider">
        <p class="my-2">From</p>
        <input
          v-model.number="minPrice"
          class="rounded-lg border border-[#d1d1d1] bg-[#F9FAFB] text-[#727782]"
          type="number"
          min="0"
          max="120000"
        />
      </div>
      <div class="flex max-w-[90px] flex-col">
        <p class="my-2">To</p>
        <input
          v-model.number="maxPrice"
          class="rounded-lg border border-[#d1d1d1] bg-[#F9FAFB] text-[#727782]"
          type="number"
          min="0"
          max="120000"
        />
      </div>
    </div>
    <input
      v-model.number="minPrice"
      min="0"
      max="6000"
      step="1"
      type="range"
      @change="slider"
    />
    <input
      v-model.number="maxPrice"
      min="0"
      max="6000"
      step="1"
      type="range"
      @change="slider"
    />
  </div>
</template>

<style scoped lang="scss">
.range-slider {
  width: 200px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
}

.range-slider input[type='range'] {
  position: absolute;
  left: 0;
  top: -10px;
}

input[type='range'] {
  width: 100%;
}

input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: #e5e7eb;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type='range']::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0 0 0 #000;
  border: 1px solid;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

input[type='range']:focus {
  outline: none;
}
</style>
