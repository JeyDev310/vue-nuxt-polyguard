<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
})

interface Emits {
  (e: 'confirm' | 'cancel'): void
  (e: 'update:isOpen', value: boolean): void
}

const emit = defineEmits<Emits>()

function handleConfirm() {
  emit('confirm')
  emit('update:isOpen', false)
}

function handleCancel() {
  emit('cancel')
  emit('update:isOpen', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content">
            <h3 class="modal-title">{{ props.title }}</h3>
            <p class="modal-message">{{ props.message }}</p>
            <div class="modal-actions">
              <button class="button button--dark" @click="handleConfirm">
                Yes, Delete
              </button>
              <button
                class="button button--secondary"
                autofocus
                @click="handleCancel"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black/50;
}

.modal-container {
  @apply w-full max-w-md rounded-lg bg-white p-6 shadow-xl;
}

.modal-content {
  @apply flex flex-col gap-4;
}

.modal-title {
  @apply text-lg font-bold;
}

.modal-message {
  @apply text-gray-600;
}

.modal-actions {
  @apply mt-4 flex justify-end gap-3;
}

.button {
  @apply rounded-md px-3 py-1 text-sm transition-colors duration-200;
}

.button--secondary {
  @apply border border-gray-300 bg-white text-gray-700 hover:bg-gray-50;
}

.button--dark {
  @apply bg-red-600 text-white hover:bg-red-700;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
</style>
