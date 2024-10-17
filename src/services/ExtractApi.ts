import { TransactionType } from '@/types/Extract'
import { RegisterPixType } from '@/types/userType'
import { useMutation, useQuery } from 'react-query'
import { api } from './api'

// const useExtractInfo = () => {
//   return useMutation(
//     async (params: { start: string; end: string; type: string }) => {
//       const { data } = await api.post<ExtractType>('/portal/extract', params)
//       return data
//     }
//   )
// }

const useExtractInfo = ({
  start,
  end,
  type
}: {
  start: string
  end: string
  type: string
}) => {
  return useQuery('extract-info', async () => {
    const { data } = await api.post<RegisterPixType[]>('/portal/extract', {
      start,
      end,
      type
    })
    return data
  })
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
