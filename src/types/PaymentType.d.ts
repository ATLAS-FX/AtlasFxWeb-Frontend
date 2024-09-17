export type PaymentType = {
  barcode: string
  charges: number
  document: string
  bank: string
  agency: string
  account: string
  expired_date: Date
  fee: number
  owner: string
  price: number
  receviePrice: number
}
