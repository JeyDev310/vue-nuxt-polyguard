<script setup lang="ts">
import { ref, computed } from '#imports'

interface Props {
  modelValue: number
  totalPages: number
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: number): void
}

const emit = defineEmits<Emits>()

const currentPage = ref<number>(props.modelValue ?? 1)

const pagination = computed(() => {
  // Algorithm's reference:
  // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598#gistcomment-3413141
  const center = [
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
  ]
  const filteredCenter: Array<string | number> = center.filter(
    (p) => p > 1 && p < props.totalPages,
  )
  /* const includeThreeLeft = current === 5
      const includeThreeRight = current === total - 4 */
  const includeLeftDots = props.totalPages > 3 && currentPage.value > 3
  const includeRightDots =
    props.totalPages > 3 && currentPage.value < props.totalPages - 2

  if (includeLeftDots) {
    filteredCenter.unshift('...')
  }
  if (includeRightDots) {
    filteredCenter.push('...')
  }

  return props.totalPages <= 1 ? [1] : [1, ...filteredCenter, props.totalPages]
})

const prevClasses = computed(() => {
  if (currentPage.value === 1) {
    return 'link'
  }
  return 'link clickable'
})

const nextClasses = computed(() => {
  if (currentPage.value === props.totalPages) {
    return 'link'
  }
  return 'link clickable'
})

const classes = computed(() => {
  if (props.totalPages <= 1) {
    return 'hidden'
  }
  return ''
})

function goToPage(page: number | string): void {
  currentPage.value = parseInt(page.toString())
  emit('update:modelValue', currentPage.value)
}

function goToPreviousPage(): void {
  if (currentPage.value - 1) {
    currentPage.value = currentPage.value - 1
    emit('update:modelValue', currentPage.value)
  }
}

function goToNextPage(): void {
  if (props.totalPages > currentPage.value) {
    currentPage.value = currentPage.value + 1
    emit('update:modelValue', currentPage.value)
  }
}

function pageClass(page: number | string): string | undefined {
  const classes = ['link']
  const pageString = page.toString()
  if (pageString === props.modelValue.toString()) {
    classes.push('active')
  }
  if (pageString !== '...') {
    classes.push('clickable')
  }
  return classes.join(' ')
}
</script>

<template>
  <div class="flex max-w-fit items-center justify-center" :class="classes">
    <nav
      class="heading-16 isolate inline-flex items-center space-x-1 text-gray-600"
      aria-label="Pagination"
    >
      <div class="prev link" :class="prevClasses" @click="goToPreviousPage">
        <span class="sr-only">Previous</span>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.21082 11.8333C5.91676 11.8333 5.63475 11.7104 5.42685 11.4919L0.991329 6.83097C0.783446 6.61246 0.666664 6.31613 0.666664 6.00715C0.666664 5.69817 0.783446 5.40184 0.991329 5.18333L5.42685 0.522389C5.52914 0.411097 5.6515 0.322327 5.78678 0.261258C5.92207 0.200189 6.06758 0.168045 6.21482 0.1667C6.36205 0.165356 6.50807 0.194838 6.64435 0.253427C6.78062 0.312016 6.90443 0.398539 7.00855 0.507946C7.11266 0.617353 7.195 0.747454 7.25076 0.890657C7.30651 1.03386 7.33457 1.1873 7.33329 1.34202C7.33201 1.49674 7.30142 1.64964 7.2433 1.7918C7.18519 1.93396 7.10071 2.06254 6.9948 2.17003L3.34326 6.00715L6.9948 9.84427C7.14983 10.0072 7.25541 10.2148 7.29817 10.4408C7.34094 10.6668 7.31898 10.9011 7.23507 11.114C7.15116 11.3269 7.00907 11.5088 6.82676 11.6369C6.64445 11.7649 6.43011 11.8333 6.21082 11.8333Z"
            fill="#222222"
          />
        </svg>
      </div>
      <div v-for="(page, index) in pagination" :key="index">
        <span v-if="page === '...'" class="link">{{ page }}</span>
        <div
          v-else
          :class="pageClass(page)"
          style="
            width: 36px;
            height: 36px;
            font-family: Inter;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            letter-spacing: 0%;
            text-align: center;
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </div>
      </div>
      <div class="next link" :class="nextClasses" @click="goToNextPage">
        <span class="sr-only">Next</span>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.78917 11.8333C1.56989 11.8333 1.35555 11.7649 1.17324 11.6369C0.990927 11.5088 0.848835 11.3269 0.764926 11.114C0.681017 10.9011 0.659059 10.6668 0.701825 10.4408C0.744592 10.2148 0.850165 10.0072 1.0052 9.84427L4.65674 6.00715L1.0052 2.17003C0.899287 2.06254 0.81481 1.93396 0.756694 1.7918C0.698579 1.64964 0.667989 1.49674 0.66671 1.34202C0.66543 1.1873 0.693488 1.03386 0.749243 0.890657C0.804999 0.747454 0.887336 0.617353 0.991452 0.507946C1.09557 0.398539 1.21938 0.312016 1.35565 0.253427C1.49193 0.194838 1.63795 0.165356 1.78518 0.1667C1.93242 0.168045 2.07793 0.200189 2.21321 0.261258C2.3485 0.322327 2.47086 0.411097 2.57315 0.522389L7.00867 5.18333C7.21655 5.40184 7.33333 5.69817 7.33333 6.00715C7.33333 6.31613 7.21655 6.61246 7.00867 6.83097L2.57315 11.4919C2.36524 11.7104 2.08324 11.8333 1.78917 11.8333Z"
            fill="#222222"
          />
        </svg>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.link {
  @apply relative inline-flex h-8 w-8 items-center justify-center rounded-full;
  @apply md:h-14 md:w-14;

  &.active,
  &.active:hover,
  &.active.clickable:hover {
    @apply bg-primary text-white;
  }
  &.clickable {
    @apply cursor-pointer;
    &:hover {
      @apply bg-blue-200;
    }
  }
  &.prev:not(.clickable),
  &.next:not(.clickable) {
    opacity: 0.1;
  }
}
</style>
