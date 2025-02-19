import type { ComputedRef } from 'vue'
import { ClientError } from 'graphql-request'
import type { GraphQLError } from 'graphql/error'
import { z } from 'zod'
import { computed, ref } from '#imports'
import { useFlashMessagesStore } from '~/stores/flash-messages'
import { FetchError } from 'ofetch'

interface UseFormFeedback {
  errors: ComputedRef<string[]>
  messages: ComputedRef<string[]>
  addError(error: string): void

  hasErrors: ComputedRef<boolean>
  addMessage(message: string): void

  hasMessages: ComputedRef<boolean>
  reset(): void
  handleError: (error: unknown) => void
  addFlashMessage(
    type: 'success' | 'danger' | 'info' | 'warning',
    message: string,
  ): void
}

export function useFormFeedback(): UseFormFeedback {
  const flashMessagesStore = useFlashMessagesStore()

  const _errors = ref<string[]>([])
  const _messages = ref<string[]>([])

  const errors = computed<string[]>(() => _errors.value)
  const messages = computed<string[]>(() => _messages.value)
  const hasErrors = computed<boolean>(() => _errors.value.length > 0)
  const hasMessages = computed<boolean>(() => _messages.value.length > 0)

  function addError(error: string): void {
    _errors.value.push(error)
  }

  function addMessage(error: string): void {
    _messages.value.push(error)
  }

  function reset(): void {
    _errors.value = []
    _messages.value = []
  }

  function addFlashMessage(
    type: 'success' | 'danger' | 'info' | 'warning',
    message: string,
  ): void {
    switch (type) {
      case 'success':
        flashMessagesStore.setSuccessMessage(message)
        break
      case 'danger':
        flashMessagesStore.setDangerMessage(message)
        break
      case 'info':
        flashMessagesStore.setInfoMessage(message)
        break
      case 'warning':
        flashMessagesStore.setWarningMessage(message)
        break
    }
  }

  function handleError(error: unknown): void {
    if (error instanceof FetchError) {
      _errors.value.push(error.data.message || error.message)
    } else if (error instanceof ClientError) {
      _errors.value = graphQLErrorMessages(error)
    } else if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.log(err)
        addError(err.message)
      })
    } else if (error instanceof Error) {
      _errors.value.push(error.message)
    } else {
      _errors.value.push('Some error occurred!')
      console.log(error)
    }
  }

  function graphQLErrorMessages(error: ClientError): string[] {
    if (error?.response?.errors) {
      return error.response.errors.map((error: GraphQLError) => error.message)
    } else return []
  }

  return {
    errors,
    messages,
    hasErrors,
    hasMessages,
    addError,
    addMessage,
    handleError,
    addFlashMessage,
    reset,
  }
}
