export type PixType = {
  account: string
  agency: string
  bank: string
  doc: string
  key: string
  name: string
}

export type KeyPixType = {
  id: string
  type: string
  code: string
  created: string
}

export type ContactsPixType = {
  id: string
  name: string
  key: string
  created: string
}

export type SendPixType = {
  id_transaction: string
  success: string
  name: string
  document: string
  bank: string
  pay_date: string
  agency: string
  account: string
}
