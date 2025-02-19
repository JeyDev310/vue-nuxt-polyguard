import { defineEventHandler } from 'h3'

import { createBigCommerceStoreRepository } from '~~/server/integrations/bigcommerce/store'

const bigCommerceStoreRepository = createBigCommerceStoreRepository()

export default defineEventHandler(async () => {
  return await bigCommerceStoreRepository.getCountries()
})
