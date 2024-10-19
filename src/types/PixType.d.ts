export type PixType = {
  account: string
  agency: string
  bank: string
  doc: string
  key: string
  name: string
}

export type KeyPixType = {
  id: string
  type: string
  code: string
  created: string
}

export type ContactsPixType = {
  id: string
  name: string
  key: string
  created: string
}

export type SendPixType = {
  success: string
  response: {
    transactionId: string
    accountId: string
    amount: string
    category: string
    type: string
    webhook_url: string | null
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
    balance_after_transaction: string
    bank_id: string
    idempotency_key: string | null
    origin: string
    status: string
    updatedAt: string
    createdAt: string
    externalAmount: string | null
    total: string | null
    paymentMethodId: string | null
  }
}
