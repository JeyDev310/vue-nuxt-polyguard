import { getBigCommerceRestClient } from '~~/server/utils/bigcommerce/clients'

export interface StoreCountry {
  id: number
  country: string
  country_iso2: string
  country_iso3: string
}

export interface StoreCountryState {
  id: number
  state: string
  state_abbreviation: string
  country_id: number
}

const mockCountries: Array<StoreCountry> = [
  {
    id: 226,
    country: 'United States',
    country_iso2: 'US',
    country_iso3: 'USA',
  },
  {
    id: 38,
    country: 'Canada',
    country_iso2: 'CA',
    country_iso3: 'CAN',
  },
]

export function createBigCommerceStoreRepository() {
  const restClient = getBigCommerceRestClient()

  async function getCountries(): Promise<Array<StoreCountry>> {
    // const response = await restClient.get('/v2/countries')
    // return response.data

    // we need to return mockCountries for now
    return mockCountries
  }

  async function getStatesByCountry(
    countryId: number,
  ): Promise<Array<StoreCountryState>> {
    const response = await restClient.get(`/v2/countries/${countryId}/states`)
    return response.data
  }

  return {
    getCountries,
    getStatesByCountry,
  }
}
