import { ExtractType } from '@/types/Extract'
import { useMutation } from 'react-query'
import { api } from './api'

const useExtractInfo = () => {
  return useMutation(
    async (params: { start: string; end: string; type: string }) => {
      const { data } = await api.post<ExtractType>('/portal/extract', params)
      return data
    }
  )
}

export { useExtractInfo }
