import { DepositType } from '@/types/DepositType'
import { useMutation, useQuery } from 'react-query'
import { api } from './api'

const useDepositInfo = () => {
  return useQuery('list-contacts', async () => {
    const { data } = await api.post<DepositType>('/portal/deposit/info')
    return data
  })
}

const useCreateBarCode = () => {
  return useMutation(async (params: { amount: string }) => {
    const { data } = await api.post<DepositType>('/portal/deposit/barcode', params)
    return data
  })
}

const useCreateQrCode = () => {
  return useMutation(async (params: { amount: string }) => {
    const { data } = await api.post<DepositType>('/portal/deposit/qrcode', params)
    return data
  })
}

export { useCreateBarCode, useCreateQrCode, useDepositInfo }
