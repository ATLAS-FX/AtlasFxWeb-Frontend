import { TransactionType } from '@/types/Extract'
import { RegisterPixType } from '@/types/userType'
import { useMutation } from 'react-query'
import { api } from './api'

const useExtractInfo = () => {
  return useMutation(
    async (params: { start: string; end: string; type?: string }) => {
      const { data } = await api.post<RegisterPixType[]>('/portal/extract', params)
      return data
    }
  )
}

const useTransactionInfo = () => {
  return useMutation(async (params: { id: string }) => {
    const { data } = await api.post<TransactionType>(
      '/portal/transaction/detail',
      params
    )
    return data
  })
}

export { useExtractInfo, useTransactionInfo }
