import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import { getSettings } from '~~/server/utils/bigcommerce/settings'
import { logError } from '~~/server/utils/error-handler'

interface Params {
  storeHash: string
  accessToken: string
}

export function useBigCommerceManagementApi(params: Params) {
  return axios.create({
    baseURL: `https://api.bigcommerce.com/stores/${params.storeHash}/v3`,
    headers: {
      'X-Auth-Token': params.accessToken,
      'Content-Type': 'application/json',
    },
  })
}

interface BigCommerceParams {
  storeHash: string
  accessToken: string
  channelId?: string
}

export function createBigCommerceRestClient(params: BigCommerceParams) {
  const client = axios.create({
    baseURL: `https://api.bigcommerce.com/stores/${params.storeHash}`,
    headers: {
      'X-Auth-Token': params.accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      logError('BigCommerceRestClient', error)
      return Promise.reject(error)
    },
  )

  return client
}

export function createBigCommerceGraphQLClient(params: BigCommerceParams) {
  const domain = ['store', params.storeHash]

  const channelId = params.channelId
  if (channelId) {
    domain.push(channelId)
  }

  const subDomain = domain.join('-')

  return new GraphQLClient(`https://${subDomain}.mybigcommerce.com/graphql`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    errorPolicy: 'all',
  })
}

export function getBigCommerceRestClient() {
  const settings = getSettings()

  return createBigCommerceRestClient({
    storeHash: settings.storeHash,
    accessToken: settings.apiToken,
    channelId: settings.defaultChannelId.toString(),
  })
}

export function getBigCommerceGraphQlClient() {
  const settings = getSettings()

  return createBigCommerceGraphQLClient({
    storeHash: settings.storeHash,
    accessToken: settings.apiToken,
    channelId: settings.defaultChannelId.toString(),
  })
}
