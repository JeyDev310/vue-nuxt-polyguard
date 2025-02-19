import axios, { type AxiosInstance } from 'axios'
import type { ApiContext } from '#shared/types'

export function createHttpClientApi(context: ApiContext = {}): AxiosInstance {
  if (!context.env) {
    throw new Error('context.env is required')
  }

  if (!('cmsRestApiUrl' in context.env)) {
    throw new Error('cmsRestApiUrl property in context.env is required')
  }

  if (!context.env.cmsRestApiUrl) {
    throw new Error('context.env.cmsRestApiUrl cannot be blank')
  }

  const headers: Record<string, string> = {}
  if (context.accessToken) {
    headers.Authorization = `JWT ${context.accessToken}`
  }

  return axios.create({
    baseURL: context.env.cmsRestApiUrl,
    headers,
  })
}
