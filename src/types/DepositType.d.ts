export type DepositType = {
  account: string
  agency: string
  amount: string
  id: number
  name: string
  doc: string
  bank: string
  releases: DepositDetailsType[]
}

export type DepositDetailsType = {
  id: number
  method: string
  send: number
  name: string
  amount: number
  created: string
}
