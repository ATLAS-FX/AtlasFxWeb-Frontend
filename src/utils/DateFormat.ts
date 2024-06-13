export const DateFormat = (value: string): string => {
  const dataObj = new Date(value)

  const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    timeZone: 'UTC'
  })

  return dataFormatada
}
