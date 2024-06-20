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

const DateFormat = (value: string): string => {
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

export { DateFormat, formattedDate, formattedTimeAGo, invertDate }
