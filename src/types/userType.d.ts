export type UserType = {
  id: number
  name: string
  bank: string
  email: string
  account: string
  agency: string
  doc: string
  amount: string
  street: string
  st_comp: string
  st_number: string
  number: string
  district: string
  city: string
  state: string
  zip: string
  uf: string
  emailWhite: string
  releases: RegisterPixProps[]
}

export type RegisterPixType = {
  id: number
  method: string
  send: number
  name: string
  amount: number
  created: string
}

export type ThemeType = {
  primary: string
  secondary: string
  thirdy: string
  background: string
  text_primary: string
  text_secondary: string
  systemName: string
}
