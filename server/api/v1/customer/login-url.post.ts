import { defineEventHandler } from 'h3'
// import { useValidatedBody, z } from 'h3-zod'
// import { getCustomerLoginUrl } from '~~/server/integrations/bigcommerce/customer'

export default defineEventHandler(async () => {
  // const { customerId, redirectUrl, channelId } = await useValidatedBody(event, {
  //   customerId: z.union([z.string(), z.number()]),
  //   redirectUrl: z.string(),
  //   channelId: z.string(),
  // })
  //
  // return await getCustomerLoginUrl({ customerId, redirectUrl, channelId })
})
