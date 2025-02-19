export interface ApiEnv {
  cmsBaseUrl?: string
  cmsGqlUrl?: string
  cmsRestApiUrl?: string
}

export interface ApiContext {
  env?: ApiEnv
  accessToken?: string
  refreshToken?: string
}
