export interface BasicFieldType {
  label: string | null
  handle: string
  typeName: string | undefined
  placeholder: string | undefined
  labelPosition: string | undefined
  defaultValue?: string | undefined
  instructions: string | undefined
  required: boolean | undefined
  visibility: boolean | undefined
  enableConditions: boolean | undefined
  conditions: string | undefined
  enabled?: boolean | undefined
}

export interface SubmitUploadType {
  fileName: string | undefined
  fileData: string | undefined
  url?: string | undefined
}
export interface SubmitNameType {
  firstName: string
  lastName: string
}
export interface IAmInterestedInWorkingFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface TermContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  state: string
  phoneNumber: string
  message: string
}
export interface PipelineContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
}
export interface residentialContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  companyName: string
  wallConstructionType: string[]
  city: string
  state: string
  message: string
}
export interface privateBrandsContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
}
export interface PolyguardCareersSlitterAssistantFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface mechanicalContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
}
export interface highwayContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
}
export interface corporateContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  jobLocation: string
  state: string
  phoneNumber: string
  message: string
}
export interface CareersSummerBoxerFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface CareersslitterassistantFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface CareersshippingandreceivingFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface CareersProductionFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  message: string
  resume?: SubmitUploadType
}
export interface ArchitecturalContactUsFormDataType {
  yourName: SubmitNameType
  emailAddress: string
  phoneNumber: string
  companyName: string
  city: string
  state: string
  message: string
}
export interface careersFormDataType {
  yourName: string
  emailAddress: string
  phoneNumber: string
  resume?: SubmitUploadType
  message: string
}
export interface NameFieldType extends BasicFieldType {
  fields: Array<BasicFieldType>
}
export interface AddressFieldType extends BasicFieldType {
  fields?: Array<BasicFieldType> | null
}
