<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email as emailValidator,
  helpers,
} from '@vuelidate/validators'
import { saveIAmInterestedInWorkingForPolyguardSubmission } from '~~/server/integrations/craftcms/forms/api/saveIAmInterestedInWorkingForPolyguard'
import { saveTermContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/saveTermContactUs'
import { savePipelineContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/savePipelineContactUs'
import { saveresidentialContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/saveresidentialContactUs'
import { saveprivateBrandsContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/saveprivateBrandsContactUs'
import { savePolyguardCareersSlitterAssistantSubmission } from '~~/server/integrations/craftcms/forms/api/savePolyguardCareersSlitterAssistant'
import { savemechanicalContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/savemechanicalContactUs'
import { savehighwayContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/savehighwayContactUs'
import { savecorporateContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/savecorporateContactUs'
import { saveCareersSummerBoxerSubmission } from '~~/server/integrations/craftcms/forms/api/saveCareersSummerBoxer'
import { saveCareersslitterassistantSubmission } from '~~/server/integrations/craftcms/forms/api/saveCareersslitterassistant'
import { saveCareersshippingandreceivingSubmission } from '~~/server/integrations/craftcms/forms/api/saveCareersshippingandreceiving'
import { saveCareersProductionSubmission } from '~~/server/integrations/craftcms/forms/api/saveCareersProduction'
import { saveArchitecturalContactUsFormSubmission } from '~~/server/integrations/craftcms/forms/api/saveArchitecturalContactUs'
import { savecareersSubmission } from '~~/server/integrations/craftcms/forms/api/savecareers'
import {
  computed,
  reactive,
  ref,
  useRuntimeConfig,
  onMounted,
  useRouter,
} from '#imports'
import IntlTelInput from 'intl-tel-input/vue'
import 'intl-tel-input/styles'
import type {
  SubmitUploadType,
  NameFieldType,
} from '~~/server/integrations/craftcms/forms/types'
import type { PageSectionsFormieFormFieldsFragment } from '~~/server/codegen'

interface Props {
  block?: PageSectionsFormieFormFieldsFragment | null
}

const props = withDefaults(defineProps<Props>(), {
  block: undefined,
})

const config = useRuntimeConfig()
const { env } = config.public

const formType = computed(() => {
  if (
    props.block?.form &&
    props.block?.form[0]?.__typename ===
      'IAmInterestedInWorkingForPolyguard_Form'
  ) {
    return 'IAmInterestedInWorkingForPolyguard_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'TERMContactUs_Form'
  ) {
    return 'TERMContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'PipelineContactUs_Form'
  ) {
    return 'PipelineContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'residentialContactUs_Form'
  ) {
    return 'residentialContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'privateBrandsContactUs_Form'
  ) {
    return 'privateBrandsContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'PolyguardCareersSlitterAssistant_Form'
  ) {
    return 'PolyguardCareersSlitterAssistant_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'mechanicalContactUs_Form'
  ) {
    return 'mechanicalContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'highwayContactUs_Form'
  ) {
    return 'highwayContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'corporateContactUs_Form'
  ) {
    return 'corporateContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'CareersSummerBoxer_Form'
  ) {
    return 'CareersSummerBoxer_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'Careersslitterassistant_Form'
  ) {
    return 'Careersslitterassistant_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'Careersshippingandreceiving_Form'
  ) {
    return 'Careersshippingandreceiving_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'CareersProduction_Form'
  ) {
    return 'CareersProduction_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'ArchitecturalContactUs_Form'
  ) {
    return 'ArchitecturalContactUs_Form'
  } else if (
    props.block?.form &&
    props.block?.form[0]?.__typename === 'careers_Form'
  ) {
    return 'careers_Form'
  } else {
    return 'IAmInterestedInWorkingForPolyguard_Form'
  }
})
const isValid = ref(null)
const number = ref(null)
const errorCode = ref(null)

const wallConstructionTypeArr: string[] = []

function updatePhoneNumber(event: Event) {
  console.log(
    'update phonenumber1 +',
    (event.target as HTMLInputElement)?.value,
  )
  console.log('update phonenumber2 +', number.value)
  // formData['phoneNumber'] = number.value || ''
  formData['phoneNumber'] = (event.target as HTMLInputElement)?.value || ''
}

onMounted(() => {
  if (
    props.block?.form &&
    props.block?.form[0]?.__typename ===
      'IAmInterestedInWorkingForPolyguard_Form'
  ) {
    props.block?.form[0]?.rows?.forEach((row) => {
      if (row) {
        row.rowFields?.forEach((rowField) => {
          const _requiredHandle = getRequiredHandle(rowField?.handle)
          if (!_requiredHandle) return

          switch (_requiredHandle) {
            case 'yourName':
              requiredState.yourName = rowField?.required ?? false
              break
            case 'emailAddress':
              requiredState.emailAddress = rowField?.required ?? false
              break
            case 'phoneNumber':
              requiredState.phoneNumber = rowField?.required ?? false
              break
            case 'resume':
              requiredState.resume = rowField?.required ?? false
              break
            case 'message':
              requiredState.message = rowField?.required ?? false
              break
            case 'city':
              requiredState.city = rowField?.required ?? false
              break
            default:
          }
        })
      }
    })
  }
  const rules = {
    yourName: {
      required: requiredState.yourName
        ? helpers.withMessage('Name field cannot be empty', required)
        : false,
    },
    emailAddress: {
      emailValidator: helpers.withMessage(
        'Email address is not valid',
        emailValidator,
      ),
      required: requiredState.emailAddress
        ? helpers.withMessage('Email address field cannot be empty', required)
        : false,
    },
    phoneNumber: {
      required: requiredState.phoneNumber
        ? helpers.withMessage('Phone field cannot be empty', required)
        : false,
    },
    resume: {
      required: requiredState.resume
        ? helpers.withMessage('Resume field cannot be empty', required)
        : false,
    },
    message: {
      required: requiredState.message
        ? helpers.withMessage('Message field cannot be empty', required)
        : false,
    },
  }
  v$.value = useVuelidate(rules, formData)

  const telInput = document.querySelector(
    'input[type="tel"]',
  ) as HTMLInputElement | null

  if (telInput) {
    telInput.name = 'phoneNumber'
    telInput.id = 'phoneNumber'
  }
})

const disableSubmitButton = ref(false)
const submitText = ref()

// Define types for form data
interface FormData {
  Name: string
  yourName: { firstName: string; lastName: string }
  emailAddress: string
  phoneNumber: string
  message: string
  resume: File | null
  state: string
  companyName: string
  wallConstructionType: string[]
  city: string
  jobLocation: string
}

type FieldHandle = keyof FormData

interface RequiredState {
  Name: boolean
  yourName: boolean
  emailAddress: boolean
  phoneNumber: boolean
  message: boolean
  resume: boolean
  state: boolean
  city: boolean
  jobLocation: boolean
}

type RequiredStateFieldHandle = keyof RequiredState

const formData = reactive<FormData>({
  Name: '',
  yourName: { firstName: '', lastName: '' },
  emailAddress: '',
  phoneNumber: '',
  message: '',
  resume: null,
  state: '',
  city: '',
  companyName: '',
  wallConstructionType: [''],
  jobLocation: '',
})

const requiredState = reactive<RequiredState>({
  Name: false,
  yourName: false,
  emailAddress: false,
  phoneNumber: false,
  message: false,
  resume: false,
  state: false,
  city: false,
  jobLocation: false,
})

type VuelidateValidation = ReturnType<typeof useVuelidate>
type VuelidateValidationValue = VuelidateValidation['value']

const v$ = ref<VuelidateValidation | null>(null)

const resultMessage = ref('')
const hasError = ref(false)
const resumeFile = ref<SubmitUploadType>()

const formError = computed(() => {
  if (v$?.value?.$errors && v$?.value?.$errors.length > 0) {
    return 'Couldn’t save submission due to errors.'
  }

  return ''
})

// Add this interface to define the shape of the name instance
interface NameInstanceType {
  checkValidate: () => Promise<false | { firstName: string; lastName: string }>
}

const nameInstance = ref<NameInstanceType[]>([])
const router = useRouter()

async function handleSubmit() {
  const valid = await v$.value?.value.$validate()
  // Check Validate of Address Fields
  if (nameInstance.value?.[0]) {
    const nameValidation = await nameInstance.value?.[0]?.checkValidate()
    if (!nameValidation) return
  }
  if (!valid) return

  submitText.value.textContent = 'Submitted'
  disableSubmitButton.value = true
  let result
  if (formType.value === 'IAmInterestedInWorkingForPolyguard_Form') {
    result = await saveIAmInterestedInWorkingForPolyguardSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        resume: resumeFile.value,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'TERMContactUs_Form') {
    result = await saveTermContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'PipelineContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await savePipelineContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: number.value as unknown as string,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'residentialContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await saveresidentialContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        companyName: formData.companyName,
        city: formData.city,
        state: formData.state,
        phoneNumber: formData.phoneNumber,
        wallConstructionType: formData.wallConstructionType,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'privateBrandsContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await saveprivateBrandsContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'PolyguardCareersSlitterAssistant_Form') {
    console.log('phoneNumber +', formData)
    result = await savePolyguardCareersSlitterAssistantSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        resume: resumeFile.value,
      },
      { env },
    )
  } else if (formType.value === 'mechanicalContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await savemechanicalContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'highwayContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await savehighwayContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      { env },
    )
  } else if (formType.value === 'corporateContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await savecorporateContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        jobLocation: formData.jobLocation,
        state: formData.state,
      },
      { env },
    )
  } else if (formType.value === 'CareersSummerBoxer_Form') {
    console.log('phoneNumber +', formData)
    result = await saveCareersSummerBoxerSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        resume: resumeFile.value,
      },
      { env },
    )
  } else if (formType.value === 'Careersslitterassistant_Form') {
    console.log('phoneNumber +', formData)
    result = await saveCareersslitterassistantSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        resume: resumeFile.value,
      },
      { env },
    )
  } else if (formType.value === 'Careersshippingandreceiving_Form') {
    console.log('phoneNumber +', formData)
    result = await saveCareersshippingandreceivingSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        resume: resumeFile.value,
      },
      { env },
    )
  } else if (formType.value === 'CareersProduction_Form') {
    console.log('phoneNumber +', formData)
    result = await saveCareersProductionSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        resume: resumeFile.value,
      },
      { env },
    )
  } else if (formType.value === 'ArchitecturalContactUs_Form') {
    console.log('phoneNumber +', formData)
    result = await saveArchitecturalContactUsFormSubmission(
      {
        yourName: formData.yourName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        city: formData.city,
        state: formData.state,
        companyName: formData.companyName,
      },
      { env },
    )
  } else if (formType.value === 'careers_Form') {
    console.log('phoneNumber +', formData)
    result = await savecareersSubmission(
      {
        yourName: formData.Name,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
      { env },
    )
  }

  if (!result) {
    // resultMessage.value = props.block?.form[0]?.errorMessage
    hasError.value = true
    setTimeout(() => {
      resultMessage.value = ''
      hasError.value = false
      disableSubmitButton.value = false
      submitText.value.textContent = 'Submit'
    }, 3000)
  } else {
    resultMessage.value =
      'Success! Can submit after 10s, or change form inputs.'
    setTimeout(() => {
      resultMessage.value = ''
      hasError.value = false
      disableSubmitButton.value = false
      submitText.value.textContent = 'Submit'
      router.push('/thank-you')
    }, 3000)
  }
}

function onChangeForm() {
  submitText.value.textContent = 'Submit'
  disableSubmitButton.value = false
}

function hasValidationError(
  validationObj: VuelidateValidationValue,
  handle: string | null | undefined,
): handle is string {
  return (
    typeof handle === 'string' &&
    validationObj &&
    handle in validationObj &&
    validationObj[handle]?.$errors?.length > 0
  )
}

function getTagByFieldType(fieldType?: string): string {
  if (fieldType === 'Field_MultiLineText') {
    return 'textarea'
  }
  if (fieldType === 'Field_Dropdown') {
    return 'v-select'
  }
  return 'input'
}

function getInputType(fieldType?: string): string {
  switch (fieldType) {
    case 'Field_Name':
      return 'text'
    case 'Field_Phone':
      return 'phone'
    case 'Field_Email':
      return 'text'
    case 'Field_FileUpload':
      return 'file'
    default:
  }
  return 'text'
}

function updateInputByFieldType(
  event: Event,
  handle: FieldHandle | null,
  fieldType: string,
): void {
  if (!handle) return
  const _target = event.target
  if (
    !(
      _target instanceof HTMLInputElement ||
      _target instanceof HTMLTextAreaElement
    )
  )
    return

  if (handle === 'message') formData[handle] = _target?.value

  if (!(_target instanceof HTMLInputElement)) return
  switch (handle) {
    case 'resume':
      formData[handle] = _target.files?.[0] ?? null
      break
    case 'emailAddress':
      formData[handle] = _target.value
      break
    case 'phoneNumber':
      formData[handle] = _target.value
      break
    case 'companyName':
      formData[handle] = _target.value
      break
    case 'city':
      formData[handle] = _target.value
      break
    case 'state':
      formData[handle] = _target.value
      break
    case 'jobLocation':
      formData[handle] = _target.value
      break
    case 'yourName':
      if (formType.value === 'careers_Form') {
        formData['Name'] = _target.value
      } else {
        formData[handle] = {
          ...formData[handle],
          [_target.name as 'firstName' | 'lastName']: _target.value,
        }
      }
      break
    default:
  }

  switch (fieldType) {
    case 'Field_FileUpload':
      updateFileName(event)
      break
    default:
  }
}

function updateFileName(event: Event) {
  const _target = event.target as HTMLInputElement
  if (!_target || !(_target instanceof HTMLInputElement)) return

  if (_target.files && _target.files.length > 0) {
    if (!_target.files[0]) return

    let base64Data: string | undefined
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      base64Data = e.target?.result as string
      resumeFile.value = {
        fileName: _target.files?.[0]?.name ?? '',
        fileData: base64Data,
      }
    }
    fileReader.readAsDataURL(_target.files[0])
  }
}

function getFieldHandle(handle?: string | null): FieldHandle | null {
  switch (handle) {
    case 'yourName':
      return 'yourName'
    case 'emailAddress':
      return 'emailAddress'
    case 'phoneNumber':
      return 'phoneNumber'
    case 'message':
      return 'message'
    case 'resume':
      return 'resume'
    case 'companyName':
      return 'companyName'
    case 'city':
      return 'city'
    case 'state':
      return 'state'
    case 'wallConstructionType':
      return 'wallConstructionType'
    case 'jobLocation':
      return 'jobLocation'
    default:
      return null
  }
}

function getRequiredHandle(
  handle?: string | null,
): RequiredStateFieldHandle | null {
  switch (handle) {
    case 'yourName':
      return 'yourName'
    case 'emailAddress':
      return 'emailAddress'
    case 'phoneNumber':
      return 'phoneNumber'
    case 'message':
      return 'message'
    case 'resume':
      return 'resume'
    case 'city':
      return 'city'
    default:
      return null
  }
}

function selectValue(event: Event, handle: FieldHandle | null): void {
  const _target = event.target
  if (!(_target instanceof HTMLSelectElement) || !handle) return
  if (handle === 'state') {
    formData[handle] = _target.value
  } else if (handle === 'wallConstructionType') {
    wallConstructionTypeArr.push(_target.value)
    formData[handle] = wallConstructionTypeArr
  }
}
</script>

<template>
  <form
    method="post"
    class="w-full"
    @submit.prevent="handleSubmit"
    @change="onChangeForm"
  >
    <div v-if="formError" class="mb-4 rounded bg-red-100 p-2 text-red-400">
      {{ formError }}
    </div>
    <template v-if="props.block?.form">
      <div
        v-for="(row, rowIndex) in props.block?.form[0]?.rows"
        :key="rowIndex"
        class="mb-8"
      >
        <div
          v-for="(rowField, fieldIndex) in row?.rowFields"
          :key="rowIndex + ',' + fieldIndex"
          class="relative"
        >
          <label
            v-if="!rowField?.labelPosition?.includes('Hidden')"
            :for="rowField?.label ?? ''"
            class="mb-2 block text-sm"
            >{{ rowField?.label
            }}<span v-if="rowField?.required" class="text-red-400"
              >*</span
            ></label
          >
          <p class="my-1 text-xs text-gray-400">
            {{ rowField?.instructions }}
          </p>
          <FormsFieldName
            v-if="rowField?.__typename === 'Field_Name' && 'fields' in rowField"
            ref="nameInstance"
            :block="rowField as NameFieldType"
            @update:model-value="
              (value: any) => {
                formData[rowField?.handle as keyof typeof formData] = value
              }
            "
          />
          <select
            v-else-if="rowField?.__typename === 'Field_Dropdown'"
            :id="rowField?.handle || undefined"
            :type="getInputType(rowField?.typeName ?? undefined)"
            :name="rowField?.handle || undefined"
            class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            @change="
              (event) => selectValue(event, getFieldHandle(rowField?.handle))
            "
          >
            <option
              v-for="(state, index) in rowField?.options"
              :key="index"
              :value="state?.value"
            >
              {{ state?.label }}
            </option>
          </select>
          <div
            v-else-if="
              rowField?.__typename === 'Field_Phone' && rowField?.countryEnabled
            "
            class="relative grid"
          >
            <IntlTelInput
              :options="{
                initialCountry: 'us',
                separateDialCode: true,
              }"
              class="w-full rounded-full border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              @input="updatePhoneNumber"
              @change-number="number = $event"
              @change-validity="isValid = $event"
              @change-error-code="errorCode = $event"
            />
            <p
              v-if="hasValidationError(v$?.value, 'phoneNumber')"
              class="mt-1 text-sm text-red-400"
            >
              {{ v$?.value.phoneNumber.$errors[0]?.$message }}
            </p>
          </div>
          <template v-else-if="rowField && 'fields' in rowField">
            <div
              v-for="(rowFields, fieldsIndex) in rowField.fields"
              :key="fieldIndex + ',' + fieldsIndex"
              class="relative"
            >
              <label
                v-if="!rowFields?.labelPosition?.includes('Hidden')"
                :for="rowFields?.label ?? ''"
                class="mb-2 block text-sm"
                >{{ rowFields?.label
                }}<span v-if="rowFields?.required" class="text-red-400"
                  >*</span
                ></label
              >
              <p class="my-1 text-xs text-gray-400">
                {{ rowFields?.instructions }}
              </p>
              <Component
                :is="getTagByFieldType(rowFields?.typeName ?? undefined)"
                :id="rowFields?.handle"
                :type="getInputType(rowFields?.typeName ?? undefined)"
                :name="rowFields?.handle"
                :placeholder="rowFields?.placeholder"
                :value="formData[rowFields?.handle as keyof typeof formData]"
                rows="4"
                class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                @input="
                  (event: Event) =>
                    updateInputByFieldType(
                      event,
                      getFieldHandle(rowFields?.handle),
                      rowFields?.__typename ?? '',
                    )
                "
              />
            </div>
          </template>
          <Component
            :is="getTagByFieldType(rowField?.typeName ?? undefined)"
            v-else-if="rowField?.typeName === 'Field_FileUpload'"
            :id="rowField?.handle"
            :type="getInputType(rowField?.typeName ?? undefined)"
            :name="rowField?.handle"
            :placeholder="rowField?.placeholder"
            rows="4"
            class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            @input="
              (event: Event) =>
                updateInputByFieldType(
                  event,
                  getFieldHandle(rowField?.handle),
                  rowField?.__typename ?? '',
                )
            "
          />
          <Component
            :is="getTagByFieldType(rowField?.typeName ?? undefined)"
            v-else-if="rowField && rowField?.handle !== 'yourName'"
            :id="rowField?.handle"
            :type="getInputType(rowField?.typeName ?? undefined)"
            :name="rowField?.handle"
            :placeholder="rowField?.placeholder"
            :value="formData[rowField?.handle as keyof typeof formData]"
            rows="4"
            class="w-full rounded-forminput border border-tertiary-light px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            @input="
              (event: Event) =>
                updateInputByFieldType(
                  event,
                  getFieldHandle(rowField?.handle),
                  rowField?.__typename ?? '',
                )
            "
          />
          <p
            v-if="hasValidationError(v$?.value, rowField?.handle)"
            class="mt-1 text-sm text-red-400"
          >
            {{ v$?.value[rowField?.handle].$errors[0]?.$message }}
          </p>
        </div>
      </div>
    </template>
    <button
      type="submit"
      :class="disableSubmitButton ? 'pointer-events-none opacity-50' : ''"
      class="rounded-forminput bg-fui-primary px-6 py-2 text-white hover:bg-fui-hover focus:outline-none focus:ring-1 focus:ring-offset-2"
    >
      <span ref="submitText">Contact Us</span>
    </button>
    <p
      :class="{
        'text-bkr-red': hasError,
      }"
      class="absolute -bottom-8 left-1/2 -translate-x-1/2"
    >
      {{ resultMessage }}
    </p>
  </form>
</template>

<style scoped lang="scss">
:deep(.iti__selected-country-primary) {
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
</style>
