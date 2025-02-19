import { defineEventHandler } from 'h3'
import { useValidatedParams, z } from 'h3-zod'

import { createBigCommerceStoreRepository } from '~~/server/integrations/bigcommerce/store'

const bigCommerceStoreRepository = createBigCommerceStoreRepository()

const GetCountryStatesParamsSchema = z.object({
  id: z.coerce.number(),
} as const)

export default defineEventHandler(async (event) => {
  const { id: countryId } = await useValidatedParams(
    event,
    GetCountryStatesParamsSchema,
  )

  return await bigCommerceStoreRepository.getStatesByCountry(countryId)
})
