declare namespace App {
  export interface UserProps {
    id: number
    name: string
    account: string
    agency: string
    doc: string
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
  export interface ProfileProps {
    name: string
    email: string
    account: string
    agency: string
    street: string
    st_comp: string
    st_number: string
    district: string
    city: string
    state: string
    zip: string
    uf: string
    email_white_label: string
  }
}
