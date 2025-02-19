import { getBigCommerceRestClient } from '~~/server/utils/bigcommerce/clients'
import { getSettings } from '~~/server/utils/bigcommerce/settings'
import { z } from 'zod'

export interface CartItem {
  id: string
  productId: number
  variantId: number
  name: string
  quantity: number
  imageUrl: string
  sku: string
  listPrice: number
  salePrice: number
  extendedListPrice: number
  extendedSalePrice: number
}

export interface Cart {
  id: string
  customerId?: number
  items: CartItem[]
  totalItems: number
  baseAmount: number
  discountAmount: number
  cartAmount: number
  version: number
  channelId: number
}

export interface AddToCartLineItem {
  quantity: number
  productId: number
  variantId?: number
}

const CartItemSchema = z.object({
  id: z.string(),
  product_id: z.number(),
  variant_id: z.number(),
  sku: z.string(),
  name: z.string(),
  quantity: z.number(),
  image_url: z.string(),
  list_price: z.number(),
  sale_price: z.number(),
  extended_list_price: z.number(),
  extended_sale_price: z.number(),
})

const CartResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    customer_id: z.number(),
    channel_id: z.number(),
    email: z.string(),
    currency: z.object({
      code: z.string(),
    }),
    tax_included: z.boolean(),
    base_amount: z.number(),
    discount_amount: z.number(),
    manual_discount_amount: z.number(),
    cart_amount: z.number(),
    coupons: z.array(z.any()),
    discounts: z.array(z.any()),
    line_items: z.object({
      physical_items: z.array(CartItemSchema),
      digital_items: z.array(CartItemSchema),
      gift_certificates: z.array(z.any()),
      custom_items: z.array(z.any()),
    }),
    created_time: z.string(),
    updated_time: z.string(),
    locale: z.string(),
    version: z.number(),
  }),
  meta: z.record(z.any()).default({}),
})

function formatCartResponse(rawCart: unknown): Cart {
  const cart = CartResponseSchema.parse(rawCart)
  const {
    id,
    customer_id,
    line_items,
    base_amount,
    discount_amount,
    cart_amount,
    version,
    channel_id,
  } = cart.data

  const items = [...line_items.physical_items, ...line_items.digital_items].map(
    ({
      id,
      product_id,
      variant_id,
      name,
      quantity,
      image_url,
      sku,
      list_price,
      sale_price,
      extended_list_price,
      extended_sale_price,
    }) => ({
      id,
      productId: product_id,
      variantId: variant_id,
      name,
      quantity,
      imageUrl: image_url,
      sku,
      listPrice: list_price,
      salePrice: sale_price,
      extendedListPrice: extended_list_price,
      extendedSalePrice: extended_sale_price,
    }),
  )

  return {
    id,
    customerId: customer_id,
    channelId: channel_id,
    items,
    totalItems: items.length,
    baseAmount: base_amount,
    discountAmount: discount_amount,
    cartAmount: cart_amount,
    version,
  }
}

export function createBigCommerceCartRepository() {
  const restClient = getBigCommerceRestClient()
  const bigCommerceSettings = getSettings()

  async function getCartById(cartId: string): Promise<Cart | null> {
    const response = await restClient.get(`/v3/carts/${cartId}`)

    return formatCartResponse(response.data)
  }

  async function createEmptyCart(customerId: number = 0): Promise<Cart> {
    console.log('createCart - customerId:', customerId)
    const response = await restClient.post('/v3/carts', {
      customer_id: customerId,
      channel_id: bigCommerceSettings.defaultChannelId,
      line_items: [],
    })
    console.log('createCart - response:', response.data.data.line_items)
    return formatCartResponse(response.data)
  }

  async function addToCart(params: {
    cartId: string
    lineItem: AddToCartLineItem
  }): Promise<Cart> {
    const response = await restClient.post(`/v3/carts/${params.cartId}/items`, {
      line_items: [
        {
          quantity: params.lineItem.quantity,
          product_id: params.lineItem.productId,
          variant_id: params.lineItem.variantId,
        },
      ],
    })

    return formatCartResponse(response.data)
  }

  async function updateCartItem(params: {
    cartId: string
    itemId: string
    lineItem: AddToCartLineItem
  }): Promise<Cart> {
    const response = await restClient.put(
      `/v3/carts/${params.cartId}/items/${params.itemId}`,
      {
        line_item: {
          quantity: params.lineItem.quantity,
          product_id: params.lineItem.productId,
          variant_id: params.lineItem.variantId,
        },
      },
    )

    return formatCartResponse(response.data)
  }

  async function removeCartItem(params: {
    cartId: string
    itemId: string
  }): Promise<Cart | null> {
    const { data } = await restClient.delete(
      `/v3/carts/${params.cartId}/items/${params.itemId}`,
    )

    if (!data) {
      return null
    }

    return formatCartResponse(data)
  }

  interface CartRedirectUrlsResponse {
    data: {
      cart_url: string
      checkout_url: string
      embedded_checkout_url: string
    }
    meta: Record<string, unknown>
  }

  async function getCartRedirectUrls(
    cartId: string,
  ): Promise<CartRedirectUrlsResponse['data']> {
    const response = await restClient.post<CartRedirectUrlsResponse>(
      `/v3/carts/${cartId}/redirect_urls`,
    )

    return response.data.data
  }

  async function updateCustomerId(
    cartId: string,
    params: {
      customerId: number
      version?: number
    },
  ): Promise<Cart> {
    const response = await restClient.put(`/v3/carts/${cartId}`, {
      customer_id: params.customerId,
      version: params.version,
    })

    return formatCartResponse(response.data)
  }

  return {
    getCartById,
    createEmptyCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    getCartRedirectUrls,
    updateCustomerId,
  }
}
