<script setup lang="ts">
interface Props {
  stroke?: string
}
const props = withDefaults(defineProps<Props>(), {
  stroke: '#85909C',
})
</script>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1170_20655)">
      <path
        d="M14 11V17"
        :stroke="props.stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 11V17"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 7V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 7H20"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 7L9 3H15L17 7"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1170_20655">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
