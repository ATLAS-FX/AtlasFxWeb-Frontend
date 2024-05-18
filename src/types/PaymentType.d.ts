declare namespace App {
  export interface PaymentProps {
    barcode: string
    charges: number
    document: string
    expired_date: Date
    fee: number
    owner: string
    price: number
    receviePrice: number
  }
}
