import {
  defineNuxtPlugin,
  useBigCommerceAuth,
  useBigCommerceCart,
} from '#imports'

export default defineNuxtPlugin(async () => {
  const bigCommerceAuth = useBigCommerceAuth()
  const bigCommerceCart = useBigCommerceCart()

  await bigCommerceAuth.reload()
  console.log('BigCommerce Auth reloaded')

  bigCommerceCart
    .getCurrentCart()
    .then(() => console.log('BigCommerce Cart reloaded'))
})
