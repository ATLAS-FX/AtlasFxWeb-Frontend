function maskOfEmail(email: string): string {
  const partes = email.split('@')
  const nome = partes[0]
  const dominio = partes[1]

  const nameMasked =
    nome.substring(0, 1) + '*'.repeat(nome.length - 2) + nome.slice(-1)

  return `${nameMasked}@${dominio}`
}

function maskOfCep(cep: string): string {
  const cepNumerico = cep.replace(/\D/g, '')

  if (cepNumerico.length !== 8) {
    throw new Error('CEP inválido. O CEP deve conter exatamente 8 dígitos.')
  }

  return cepNumerico.slice(0, 5) + '-' + cepNumerico.slice(5)
}
export { maskOfCep, maskOfEmail }
