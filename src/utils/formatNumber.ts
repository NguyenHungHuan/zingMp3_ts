export const formatNumberSocial = (number: number) => Intl.NumberFormat('en', { notation: 'compact' }).format(number)
