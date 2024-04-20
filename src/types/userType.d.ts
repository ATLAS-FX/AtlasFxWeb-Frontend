declare namespace App {
  export interface UserProps {
    id: number
    name: string
    account: string
    agency: string
    amount: string
    releases: RegisterPixProps[]
  }
  export interface RegisterPixProps {
    id: number
    method: string
    send: number
    name: string
    amount: number
    created: string
  }
}
