export const formattedDoc = (value: string, type: string) => {
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
