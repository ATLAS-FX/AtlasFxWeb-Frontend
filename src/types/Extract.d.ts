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
    operationNumber: string
    clientNamePayer: string
    agencyPayer: string
    accountTypePayer: string
    accountPayer: string
    bankIspbPayer: string
    documentPayer: string
    receiptKey: string
    documentReceiver: string
    accountReceiver: string
    txId: string
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
    companyName: string
    documentNumber: string
    fantasyName: string
    isIndirectPix: boolean
  }
  balanceAfterTransaction: string
  bank_id: string
  idempotencyKey: string
  origin: string
}
