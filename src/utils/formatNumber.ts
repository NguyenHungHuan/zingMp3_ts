export const formatNumberSocial = (number: number) =>
  Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 0 }).format(number)

export function formatPriceNumber(price: number) {
  return new Intl.NumberFormat('de-DE').format(price)
}
