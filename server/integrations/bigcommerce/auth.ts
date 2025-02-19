import {
  getBigCommerceGraphQlClient,
  getBigCommerceRestClient,
} from '~~/server/utils/bigcommerce/clients'
import { getSettings } from '~~/server/utils/bigcommerce/settings'
import type { Customer } from '~~/server/integrations/bigcommerce/customer'

/**
 * Variables required for the BigCommerce login mutation
 * @see {@link https://developer.bigcommerce.com/graphql-storefront/reference#mutation-login}
 */
interface LoginMutationVariables {
  email: string
  password: string
  guestCartEntityId?: string
  [key: string]: string | undefined
}

/**
 * Response structure from the BigCommerce login mutation
 * Contains the authenticated customer's details
 */
interface LoginMutationResponse {
  login: {
    customer: {
      entityId: number
      email: string
      firstName: string
      lastName: string
      company?: string
      phone?: string
    }
    customerAccessToken: {
      value: string
      expiresAt: string
    } | null
  }
}

/**
 * GraphQL mutation for authenticating a customer
 * Retrieves basic customer information upon successful login
 */
const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!, $guestCartEntityId: String) {
    login(email: $email, password: $password, guestCartEntityId: $guestCartEntityId) {
      customer {
        entityId
        email
        firstName
        lastName
        company
        phone
      }
      customerAccessToken {
        value
        expiresAt
      }
    }
  }
` as const

export function createBigCommerceCustomerAuthRepository(params: {
  storefrontToken: string
}) {
  const graphqlClient = getBigCommerceGraphQlClient()
  const settings = getSettings()

  graphqlClient.setHeader('Authorization', `Bearer ${params.storefrontToken}`)

  const restClient = getBigCommerceRestClient()

  /**
   * Authenticates a customer with BigCommerce using their email and password
   * @see {@link https://developer.bigcommerce.com/graphql-storefront/reference#mutation-login} BigCommerce Login Mutation API Reference
   * @param {string} email - The customer's email address
   * @param {string} password - The customer's password
   * @param {string} [guestCartEntityId] - Optional ID of the guest cart to associate with the customer's account
   * @returns {Promise<LoginMutationResponse>} A promise that resolves to the login mutation response
   * @throws {Error} If the authentication fails or if there's a network error
   */
  async function login(
    email: string,
    password: string,
    guestCartEntityId?: string,
  ): Promise<LoginMutationResponse> {
    return await graphqlClient.request<
      LoginMutationResponse,
      LoginMutationVariables
    >(LOGIN_MUTATION, {
      email,
      password,
      guestCartEntityId,
    })
  }

  /**
   * Response structure from the BigCommerce logout mutation
   */
  interface LogoutMutationResponse {
    logout: {
      result: string
    }
  }

  /**
   * GraphQL mutation for logging out a customer
   */
  const LOGOUT_MUTATION = `
  mutation logout {
    logout {
      result
    }
  }
` as const

  /**
   * Logs out the currently authenticated customer from BigCommerce
   * @see {@link https://developer.bigcommerce.com/graphql-storefront/reference#mutation-logout} BigCommerce Logout Mutation API Reference
   * @returns {Promise<LogoutMutationResponse>} A promise that resolves to the logout mutation response
   * @throws {Error} If the logout fails or if there's a network error
   */
  async function logout(): Promise<LogoutMutationResponse> {
    return await graphqlClient.request<LogoutMutationResponse>(LOGOUT_MUTATION)
  }

  interface CustomerResponse {
    customer: {
      entityId: number
      email: string
      firstName: string
      lastName: string
      company?: string
      phone?: string
    }
  }

  const GET_CUSTOMER_QUERY = `
    query GetCustomer {
      customer {
        entityId
        firstName
        lastName
        email
        company
        phone
      }
    }
  ` as const

  async function getCustomerByAccessToken(
    customerAccessToken: string,
  ): Promise<CustomerResponse['customer'] | null> {
    graphqlClient.setHeader('X-Bc-Customer-Access-Token', customerAccessToken)

    const response =
      await graphqlClient.request<CustomerResponse>(GET_CUSTOMER_QUERY)

    const { customer } = response
    if (!customer) return null

    return customer
  }

  interface CreateCustomerParams {
    email: string
    firstName: string
    lastName: string
    company?: string
    phone?: string
    password: string
  }

  interface CreateCustomerResponse {
    data: Array<Customer>
  }

  async function createCustomer(
    params: CreateCustomerParams,
  ): Promise<Customer | null> {
    const { defaultChannelId } = settings
    const { data } = await restClient.post<CreateCustomerResponse>(
      '/v3/customers',
      [
        {
          email: params.email,
          first_name: params.firstName,
          last_name: params.lastName,
          company: params.company,
          phone: params.phone,
          origin_channel_id: defaultChannelId,
          channel_ids: [1, defaultChannelId],
          authentication: {
            force_password_reset: false,
            new_password: params.password,
          },
        },
      ],
    )

    if (!data || data.data.length === 0) {
      throw new Error(`Error in creating the customer`)
    }

    return data.data[0] ?? null
  }

  return {
    login,
    logout,
    getCustomerByAccessToken,
    createCustomer,
  }
}
