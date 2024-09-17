import { TransferType } from '@/types/TransferType'
import { useMutation } from 'react-query'
import { api } from './api'

const useTransferApi = () => {
  return useMutation(async (params: TransferType) => {
    const { data } = await api.post('/portal/ted/send', params)
    return data
  })
}

export { useTransferApi }
