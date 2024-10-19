export type TransactionTaxaType = {
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
    clientCompanyName: string | null
    clientFantasyName: string | null
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

export type TransactionType = {
  transactionId: string
  accountId: string
  amount: string
  category: string
  type: string
  transactionData: {
    keySource: string
    keyTarget: string
    status: string
    clientFantasyName: string
    recept_cpf_cnpj: string
    recept_name: string
    recept_account: string
    recept_agency: string
    recept_ispb_bank: string
    clientNamePayer: string
    documentPayer: string
    pixResponse: {
      key: string
      type: string
      account: {
        agency: string
        number: string
        openingDate: string
        type: string
        branch: string
        participant: string
      }
      owner: {
        cpf_cnpj: string
        name: string
        type: string
        document: string
      }
      extra: {
        createdEntryCid: string
        creationDate: string
        deletedEntryCid: string
        endToEndId: string
        keyOwnershipDate: string
        piPayerId: string
      }
    }
    description: string
    bankName: string
    bankCode: string
    fee: {
      feeName: string
      transactionValue: number
      productId: number
      isOwner: boolean
      planId: number
    }
    operationNumber: string
    bank: string
    agency: string
    accountType: string
    account: string
    cnpj: boolean
    cpf: boolean
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
    companyName: string
  }
  balanceAfterTransaction: string
  bank_id: string
  idempotencyKey: string | null
  origin: string
}
