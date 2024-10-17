export type PixStateType = {
  step: number
  select: string
  desc: string
  keyPix: string
  formatKeyPix: string
  typekeyPix: string
  save: number
  amount: string
  pwd: string
  modalPix: boolean
  modalKey: boolean
}

export type TransferStateType = {
  step: number
  save: number
  bank: string
  pwd: string
  agency: string
  account: string
  amount: string
  typeAccount: string
  name: string
  docType: string
  doc: string
  desc: string
  modalTransfer: boolean
}

export type PaymentStateType = {
  step: number
  type: string
  textValue: string
  pwdCode: string
  stateModal: boolean
}

export type ExtractStateType = {
  stepPage: number
  period: number
  type: string | null
  startDate: string
  endDate: string
  startHour: string
  endHour: string
  controlIn: number
  controlOut: number
  // firstDate: string
  // lastDate: string
  filterModal: boolean
}
