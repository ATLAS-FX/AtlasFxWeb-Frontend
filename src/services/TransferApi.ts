import { useMutation } from 'react-query'
import { api } from './api'

const useTransferApi = () => {
  return useMutation(
    async (params: {
      account: string
      account_type: string
      agency: string
      bank: string
      doc: string
      category: string
      name: string
      doc_type: string
      amount: number
      desc: string
    }) => {
      const { data } = await api.post('/portal/ted/send', params)
      return data
    }
  )
}

export { useTransferApi }
