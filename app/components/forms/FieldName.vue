<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { ref, reactive, onMounted } from '#imports'

import type {
  NameFieldType,
  SubmitNameType,
} from '~~/server/integrations/craftcms/forms/types'

interface Props {
  block?: NameFieldType
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:model-value', value: SubmitNameType): void
}

const emit = defineEmits<Emits>()

const initState = {
  firstName: '',
  lastName: '',
}

const state = reactive(initState)

const requiredState = reactive({
  firstName: false,
  lastName: false,
})

const v$ = ref<ReturnType<typeof useVuelidate> | null>(null)

onMounted(() => {
  requiredState.firstName = getRequiredByName('Field_NameFirst') ?? false
  requiredState.lastName = getRequiredByName('Field_NameLast') ?? false

  const rules = {
    firstName: {
      required: requiredState.firstName
        ? helpers.withMessage('First Name cannot be empty', required)
        : false,
    },
    lastName: {
      required: requiredState.lastName
        ? helpers.withMessage('Last Name cannot be empty', required)
        : false,
    },
  }
  v$.value = useVuelidate(rules, state)
})

const checkValidate = async () => {
  const valid = await v$.value?.value.$validate()
  if (!valid) return false
  return state
}

const onUpdateName = () => {
  emit('update:model-value', state)
}
defineExpose({ checkValidate })

const getFieldEnabled = (typeName: string) => {
  const field = props.block?.fields.find((field) => field.typeName === typeName)
  return field ? field.enabled : ''
}

const getRequiredByName = (typeName: string) => {
  const field = props.block?.fields.find((field) => field.typeName === typeName)
  return field ? field.required : false
}

const getLabelByName = (typeName: string) => {
  const field = props.block?.fields.find((field) => field.typeName === typeName)
  return field ? field.label : ''
}

const getPlaceholderByName = (typeName: string) => {
  const field = props.block?.fields.find((field) => field.typeName === typeName)
  return field ? field.placeholder : ''
}
</script>

<template>
  <div v-if="block" class="mb-8" @change="onUpdateName">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div v-if="getFieldEnabled('Field_NameFirst')">
        <label for="firstName" class="mb-2 block text-sm"
          >{{ getLabelByName('Field_NameFirst') ?? ' First Name' }}
          <span v-if="getRequiredByName('Field_NameFirst')" class="text-red-400"
            >*</span
          ></label
        >
        <input
          id="firstName"
          v-model="state.firstName"
          name="firstName"
          type="text"
          :class="
            v$ && v$.value.firstName?.$errors.length > 0
              ? '!border !border-red-600 ring-red-600'
              : 'ring-fsi-gray-5'
          "
          :placeholder="getPlaceholderByName('Field_NameFirst') ?? undefined"
          class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        <p
          v-if="v$?.value?.firstName?.$errors?.length > 0"
          class="mt-1 text-sm text-red-400"
        >
          {{ v$?.value?.firstName?.$errors[0]?.$message }}
        </p>
      </div>
      <div v-if="getFieldEnabled('Field_NameLast')">
        <label for="lastName" class="mb-2 block text-sm"
          >{{ getLabelByName('Field_NameLast') ?? ' Last Name' }}
          <span v-if="getRequiredByName('Field_NameLast')" class="text-red-400"
            >*</span
          ></label
        >
        <input
          id="lastName"
          v-model="state.lastName"
          name="lastName"
          type="text"
          :class="
            v$ && v$.value.lastName?.$errors.length > 0
              ? '!border !border-red-600 ring-red-600'
              : 'ring-fsi-gray-5'
          "
          :placeholder="getPlaceholderByName('Field_NameLast') ?? undefined"
          class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        <p
          v-if="v$?.value?.lastName?.$errors?.length > 0"
          class="mt-1 text-sm text-red-400"
        >
          {{ v$?.value?.lastName?.$errors[0]?.$message }}
        </p>
      </div>
    </div>
  </div>
</template>
