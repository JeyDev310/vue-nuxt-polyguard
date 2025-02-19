<script setup lang="ts">
import { useFlashMessagesStore } from '~/stores/flash-messages'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, watch } from '#imports'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const flashStore = useFlashMessagesStore()
const { getAllMessages } = storeToRefs(flashStore)

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  if (getAllMessages.value.length === 0) {
    return
  }

  startTimer()
})

onUnmounted(() => stopTimer())

watch(getAllMessages, () => startTimer())

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    flashStore.destroyFlash()
    stopTimer()
  }, 8000) // 8 seconds
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
  }
}

function getBackgroundColor(type: string) {
  switch (type) {
    case 'success':
      return 'bg-green-50'
    case 'danger':
      return 'bg-red-50'
    case 'warning':
      return 'bg-yellow-50'
    case 'info':
      return 'bg-blue-50'
    default:
      return 'bg-gray-50'
  }
}

function getTextColor(type: string) {
  switch (type) {
    case 'success':
      return 'text-green-800'
    case 'danger':
      return 'text-red-800'
    case 'warning':
      return 'text-yellow-800'
    case 'info':
      return 'text-blue-800'
    default:
      return 'text-gray-800'
  }
}

function getBorderColor(type: string) {
  switch (type) {
    case 'success':
      return 'border-green-300'
    case 'danger':
      return 'border-red-300'
    case 'warning':
      return 'border-yellow-300'
    case 'info':
      return 'border-blue-300'
    default:
      return 'border-gray-300'
  }
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="getAllMessages.length > 0"
      class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <TransitionGroup
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-for="message in getAllMessages"
            :key="message.message"
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg"
            :class="[
              getBackgroundColor(message.type),
              getBorderColor(message.type),
            ]"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p
                    class="text-sm font-medium"
                    :class="getTextColor(message.type)"
                  >
                    {{ message.message }}
                  </p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    :class="getTextColor(message.type)"
                    @click="flashStore.resetMessages()"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </ClientOnly>
</template>
