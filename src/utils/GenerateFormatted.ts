const formattedDate = (dateString: string): string => {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return '-'
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear().toString().substr(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const result =
    day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes + ':' + seconds
  return result
}

const formattedTimeAGo = (value: Date | string): string => {
  const date = new Date(value)

  if (isNaN(date.getTime())) {
    return '-'
  }
  const now = new Date()
  const timeDifference = now.getTime() - date.getTime()
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))

  if (minutesDifference < 1) {
    return 'Agora mesmo'
  } else if (minutesDifference === 1) {
    return 'Há 1 minuto'
  } else if (minutesDifference < 60) {
    return `Há ${minutesDifference} minutos`
  } else if (minutesDifference < 120) {
    return 'Há 1 hora'
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60)
    return `Há ${hoursDifference} horas`
  } else {
    const daysDifference = Math.floor(minutesDifference / 1440)
    return `Há ${daysDifference} dias`
  }
}

const formattedDateSample = (value: string): string => {
  const dataObj = new Date(value)

  const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    timeZone: 'America/Sao_Paulo'
  })

  return dataFormatada
}

const invertDate = (date: string): string => {
  const [day, month, year] = date.split('/')
  return `${month}/${day}/${year}`
}

const formattedDoc = (value: string, type: string) => {
  if (type === 'cnpj') {
    if (!value) return 'xx.xxx.xxx/xxxx-xx'
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    value = value.replace(
      /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
      '$1.$2.$3/$4-$5'
    )

    return value
  } else if (type === 'cpf') {
    if (!value) return 'xxx.xxx.xxx-xx'
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{3})(\d)/, '$1.$2')
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')

    return value
  }
}

function formatedPrice(value: string | undefined) {
  if (value) {
    value = value.toString()

    const isNegative = value.includes('-')

    const number = parseFloat(value.replace(/[^\d]/g, ''))
    const formattedNumber = isNegative ? number : number

    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return numberFormat
      .format(formattedNumber / 100)
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

export {
  formatedHideValue,
  formatedPrice,
  formatedPriceAbbreviate,
  formattedDate,
  formattedDateSample,
  formattedDoc,
  formattedTimeAGo,
  invertDate
}