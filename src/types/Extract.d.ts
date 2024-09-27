export type ExtractType = {
  start: string
  end: string
  type: string
}

export type TransactionType = {
  transactionId: string
  accountId: string
  amount: string
  category: string
  type: string
  transactionData: {
    agency: string
    accountNumber: string
    accountType: string
    clientType: string
    clientDocument: string
    ispbDestinyBank: string
    clientName: string | null
    clientCompanyName: string
    clientFantasyName: string
    history: string
    bankName: string
    bankCode: string
    fee: {
      feeName: string
      transactionValue: number
      productId: number
      isOwner: boolean
      planId: number
    }
  }
  createdAt: string
  updatedAt: string
  externalAmount: string | null
  paymentMethodId: string | null
  total: string | null
  webhook_url: string | null
  account: {
    phoneNumber: string
    agency: string
    accountId: string
    email: string
    personType: string
    type: string
    bankId: string
    number: string
    nameOwner: string
    companyName: string
    documentNumber: string
    fantasyName: string
    isIndirectPix: boolean
  }
  balanceAfterTransaction: string
  bank_id: string
  idempotencyKey: string | null
  origin: string
}
