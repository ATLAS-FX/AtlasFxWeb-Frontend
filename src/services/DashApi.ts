import { DashBoardType } from '@/types/DashType'
import { useMutation } from 'react-query'
import { api } from './api'

const useDashboard = () => {
  return useMutation(async (params: { start: string; end: string }) => {
    const { data } = await api.post<DashBoardType>('/portal/dashboard', params)
    return data
  })
}

export { useDashboard }
