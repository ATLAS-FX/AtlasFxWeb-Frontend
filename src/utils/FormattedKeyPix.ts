// Função para validar CPF baseado nos dígitos verificadores
const validateCPF = (cpf: string): boolean => {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false // Verifica se todos os dígitos são iguais

  let sum = 0
  let remainder

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

const validateCNPJ = (cnpj: string): boolean => {
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false // Verifica se todos os dígitos são iguais

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  let digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false

  return true
}

export const formatKeyPix = (
  keyPix: string
): { formattedKey: string; type: string } => {
  // Remove caracteres especiais (pontos, traços, barras, parênteses, etc.)
  let cleanedKey = keyPix.replace(/[^\d]/g, '')
  let formattedKey = keyPix
  let type = ''

  // Verifica se é um CPF válido
  if (/^\d{11}$/.test(cleanedKey) && validateCPF(cleanedKey)) {
    formattedKey = `${cleanedKey.slice(0, 3)}.${cleanedKey.slice(3, 6)}.${cleanedKey.slice(
      6,
      9
    )}-${cleanedKey.slice(9)}`
    type = 'cpf'
  }
  // Se não for CPF válido, verifica se é um número de telefone
  else if (/^\d{11}$/.test(cleanedKey)) {
    formattedKey = `(${cleanedKey.slice(0, 2)})${cleanedKey.slice(2, 7)}-${cleanedKey.slice(7)}`
    type = 'phone'
  }
  // Se não for CPF nem telefone, verifica se é um CNPJ
  else if (/^\d{14}$/.test(cleanedKey) && validateCNPJ(cleanedKey)) {
    formattedKey = `${cleanedKey.slice(0, 2)}.${cleanedKey.slice(2, 5)}.${cleanedKey.slice(
      5,
      8
    )}/${cleanedKey.slice(8, 12)}-${cleanedKey.slice(12)}`
    type = 'cnpj'
  }
  // Verifica se é um email
  else if (
    keyPix.includes('@') &&
    (keyPix.includes('.com') || keyPix.includes('.com.br'))
  ) {
    type = 'email'
  }
  // Caso contrário, é uma chave aleatória
  else {
    type = 'key-random'
  }

  return { formattedKey, type }
}
