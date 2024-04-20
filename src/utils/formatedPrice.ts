function formatedPrice(value: string | undefined) {
  if (value) {
    const number = parseFloat(value.replace(/[^\d]/g, ''))
    const numberFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return numberFormat
      .format(number / 100)
      .replace('R$', '')
      .trim()
  }
}

function formatedHideValue(value: string | undefined) {
  if (value) {
    const number = parseFloat(value.replace(/[^\d]/g, ''))
    const numberFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    const prepar = numberFormat
      .format(number / 100)
      .replace('R$', '')
      .trim()

    return prepar.replace(/\d/g, '*')
  }
}

function formatedPriceAbbreviate(value: string | undefined) {
  if (value) {
    const number = parseFloat(value.replace(/[^\d]/g, ''))
    if (isNaN(number)) {
      console.error('Formato inválido')
      return
    }
  }
  const abbreviateNumber = (num: number) => {
    const abbreviations = ['', 'mil', 'M', 'B']
    let index = 0
    while (num >= 1000 && index < abbreviations.length - 1) {
      num /= 1000
      index++
    }
    return `${num}${abbreviations[index]}`
  }

  const result = abbreviateNumber(Number(value))

  return result
}

export { formatedHideValue, formatedPrice, formatedPriceAbbreviate }
