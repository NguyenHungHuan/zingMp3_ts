export const formatNumberSocial = (number: number) => Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 0 }).format(number)
