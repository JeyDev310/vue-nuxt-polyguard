declare module 'eslint-config-prettier'

declare module 'intl-tel-input/vue' {
  import type { DefineComponent } from 'vue'

  const IntlTelInput: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >
  export default IntlTelInput
}
