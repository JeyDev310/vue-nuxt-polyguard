import { getBigCommerceRestClient } from '~~/server/utils/bigcommerce/clients'

export interface Customer {
  id: number
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
}

export interface CustomerAddress {
  id: number
  customer_id: number
  first_name: string
  last_name: string
  address_type: string
  address1: string
  address2: string
  company?: string
  city: string
  state_or_province: string
  postal_code: string
  country_code: string
  phone: string
  country: string
}

export interface UpdateCustomerParams {
  email?: string
  first_name?: string
  last_name?: string
  company?: string
  phone?: string
  authentication?: {
    force_password_reset: false
    new_password: string
  }
}

// https://developer.bigcommerce.com/docs/rest-management/customers/addresses#create-a-customer-address
export interface CreateCustomerAddressParams {
  // required fields
  // customer_id: number // this is not required because we are passing it in the useBigcommerceCustomer function
  first_name: string
  last_name: string
  city: string
  country_code: string
  address1: string
  state_or_province: string
  postal_code: string
  // optional fields
  company?: string
  address2?: string
  phone?: string
  country?: string
}

export interface CreateAddressResponse {
  data: Array<CustomerAddress>
}

// https://developer.bigcommerce.com/docs/rest-management/customers/addresses#update-a-customer-address
export type UpdateCustomerAddressParams = Partial<CreateCustomerAddressParams>

export interface UpdateCustomerAddressResponse {
  data: Array<CustomerAddress>
}

interface CustomerOrderShippingAddress {
  id: number
  order_id: number
  first_name: string
  last_name: string
  company: string
  street_1: string
  street_2: string
  city: string
  zip: string
  country: string
  country_iso2: string
  state: string
  email: string
  phone: string
  items_total: number
  items_shipped: number
  shipping_method: string
  base_cost: string
  cost_ex_tax: string
  cost_inc_tax: string
  cost_tax: string
  cost_tax_class_id: number
  base_handling_cost: string
  handling_cost_ex_tax: string
  handling_cost_inc_tax: string
  handling_cost_tax: string
  handling_cost_tax_class_id: number
  shipping_zone_id: number
  shipping_zone_name: string
  shipping_quotes: {
    url: string
    resource: string
  }
}

interface CustomerOrderProduct {
  id: number
  order_id: number
  product_id: number
  variant_id: number
  order_pickup_method_id: number
  order_address_id: number
  name: string
  name_customer: string
  name_merchant: string
  sku: string
  upc: string
  type: string
  base_price: string
  price_ex_tax: string
  price_inc_tax: string
  price_tax: string
  base_total: string
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  weight: string
  width: string
  height: string
  depth: string
  quantity: number
  base_cost_price: string
  cost_price_inc_tax: string
  cost_price_ex_tax: string
  cost_price_tax: string
  is_refunded: boolean
  quantity_refunded: number
  refund_amount: string
  return_id: number
  wrapping_id: number
  wrapping_name: string
  base_wrapping_cost: string
  wrapping_cost_ex_tax: string
  wrapping_cost_inc_tax: string
  wrapping_cost_tax: string
  wrapping_message: string
  quantity_shipped: number
  event_name: string
  event_date: string
  fixed_shipping_cost: string
  ebay_item_id: string
  ebay_transaction_id: string
  option_set_id: number
  parent_order_product_id: number
  is_bundled_product: boolean
  bin_picking_number: string
  external_id: number
  fulfillment_source: string
  brand: string
  gift_certificate_id: number
  discounted_total_inc_tax: string
}

export interface CustomerOrder {
  id: number
  date_created: string
  date_modified: string
  status: string
  custom_status: string
  payment_status: string
  total_ex_tax: string
  total_inc_tax: string
  total_tax: string
  items_total: number
  items_shipped: number
  currency_code: string
  subtotal_ex_tax: string
  subtotal_tax: string
  shipping_cost_inc_tax: string
  discount_amount: string
  billing_address: {
    first_name: string
    last_name: string
    company?: string
    street_1: string
    street_2?: string
    city: string
    state: string
    zip: string
    country: string
    phone: string
    email: string
  }
  products: Array<CustomerOrderProduct>
  shipping_addresses: Array<CustomerOrderShippingAddress>
}

export function createBigCommerceCustomerRepository({
  customerId,
}: {
  customerId: number
}) {
  if (!customerId) {
    throw new Error('Customer ID is required for update')
  }

  const restClient = getBigCommerceRestClient()

  interface UpdateCustomerResponse {
    data: Array<Customer>
  }

  async function update(
    params: UpdateCustomerParams,
  ): Promise<Customer | undefined> {
    const { data } = await restClient.put<UpdateCustomerResponse>(
      '/v3/customers',
      [
        {
          id: customerId,
          ...params,
        },
      ],
    )

    if (!data || data.data.length === 0) {
      throw new Error(`Customer with ID ${customerId} not found`)
    }

    return data.data[0]
  }

  interface GetCustomerAddressesResponse {
    data: Array<CustomerAddress>
    meta: {
      pagination: {
        total: number
        count: number
        per_page: number
        current_page: number
        total_pages: number
      }
    }
  }

  async function getAddresses(): Promise<GetCustomerAddressesResponse> {
    const response = await restClient.get<GetCustomerAddressesResponse>(
      '/v3/customers/addresses',
      {
        params: {
          'customer_id:in': customerId,
        },
      },
    )

    return response.data
  }

  async function getAddressById(addressId: number): Promise<CustomerAddress> {
    const { data } = await restClient.get('/v3/customers/addresses', {
      params: {
        'id:in': addressId,
      },
    })

    if (!data || data.data.length === 0) {
      throw new Error(`Address with ID ${addressId} not found`)
    }

    return data.data[0]
  }

  async function createAddress(
    params: CreateCustomerAddressParams,
  ): Promise<CreateAddressResponse> {
    const { data } = await restClient.post('/v3/customers/addresses', [
      {
        customer_id: customerId,
        ...params,
      },
    ])

    if (!data || data.data.length === 0) {
      throw new Error('Failed to create address')
    }

    return data.data[0]
  }

  async function updateAddress(
    addressId: number,
    params: UpdateCustomerAddressParams,
  ) {
    const { data } = await restClient.put<UpdateCustomerAddressResponse>(
      '/v3/customers/addresses',
      [
        {
          id: addressId,
          ...params,
        },
      ],
    )

    if (!data || data.data.length === 0) {
      throw new Error(`Address with ID ${addressId} not found`)
    }

    return data.data[0]
  }

  async function deleteAddress(addressId: number) {
    await restClient.delete('/v3/customers/addresses', {
      params: {
        'id:in': addressId,
      },
    })
  }

  async function getOrders(): Promise<Array<CustomerOrder>> {
    const response = await restClient.get<Array<CustomerOrder>>('/v2/orders', {
      params: {
        customer_id: customerId,
      },
    })

    return response.data
  }

  async function getOrderById(orderId: number): Promise<CustomerOrder> {
    const [{ data: order }, { data: products }, { data: shipping_addresses }] =
      await Promise.all([
        restClient.get(`/v2/orders/${orderId}`),
        restClient.get(`/v2/orders/${orderId}/products`),
        restClient.get(`/v2/orders/${orderId}/shipping_addresses`),
      ])

    return { ...order, products, shipping_addresses }
  }

  return {
    update,
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    getOrders,
    getOrderById,
  }
}
