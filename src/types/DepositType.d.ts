declare namespace App {
  export interface DepositProps {
    account: string
    agency: string
    amount: string
    id: number
    name: string
    doc: string
    bank: string
    releases: DepositDetailsProps[]
  }
  export interface DepositDetailsProps {
    id: number
    method: string
    send: number
    name: string
    amount: number
    created: string
  }
}
