import { BankDepositType } from '@/types/DepositType'
import { useMutation } from 'react-query'
import { api } from './api'

const useBankDepositInfo = () => {
  return useMutation(async (): Promise<BankDepositType> => {
    const { data } = await api.post('/portal/deposit/info')
    return data
  })
}

const useCreateBarCode = () => {
  return useMutation(async (params: { amount: string }) => {
    const { data } = await api.post<BankDepositType>(
      '/portal/deposit/barcode',
      params
    )
    return data
  })
}

const useCreateQrCode = () => {
  return useMutation(async (params: { amount: string }) => {
    const { data } = await api.post<BankDepositType>(
      '/portal/deposit/qrcode',
      params
    )
    return data
  })
}

export { useBankDepositInfo, useCreateBarCode, useCreateQrCode }
