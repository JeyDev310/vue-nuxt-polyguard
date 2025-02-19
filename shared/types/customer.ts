import type { InternalApi } from 'nitropack'

export type GetCurrentCustomerResponse =
  InternalApi['/api/v1/customer/current']['get']

export type UpdateCustomerResponse = InternalApi['/api/v1/customer/:id']['put']

export type GetCustomerAddressesResponse =
  InternalApi['/api/v1/customer/addresses']['get']

export type CustomerAddress = GetCustomerAddressesResponse['data'][number]

export type GetCustomerOrdersResponse =
  InternalApi['/api/v1/customer/orders']['get']

export type CustomerOrder = GetCustomerOrdersResponse[number]
