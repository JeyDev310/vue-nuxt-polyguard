import axios, { type AxiosInstance } from 'axios'
import type { ApiContext } from '#shared/types'

export function createHttpClientCms(context: ApiContext = {}): AxiosInstance {
  if (!context.env) {
    throw new Error('context.env is required')
  }

  if (!('cmsBaseUrl' in context.env)) {
    throw new Error('cmsBaseUrl property in context.env is required')
  }

  if (!context.env.cmsBaseUrl) {
    throw new Error('context.env.cmsBaseUrl cannot be blank')
  }

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  }

  // The following is a hack to get around the fact that CraftCMS
  // is having a strange behaviour with CORS Preflight requests
  // when they are sent to the root path of the site.
  // However, this doesn't happen when running locally.
  // const baseURL = context.env.cmsBaseUrl + '/admin'
  const baseURL = context.env.cmsBaseUrl

  return axios.create({
    baseURL,
    headers,
  })
}
