/*
 * Utility functions for rendering
 */
export type Currency = {
  currencyCode: string
  value: number
}

// Based on the browser locale, provide a localized price
export function formatLocalizedPrice(price: Currency) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: price.currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(price.value)
}

export function formatToUsd(usdPrice: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(usdPrice)
}
