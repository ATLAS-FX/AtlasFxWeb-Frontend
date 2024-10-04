import { ConsultPaymentType } from '@/types/PaymentType'
import { useMutation } from 'react-query'
import { api } from './api'

const useConsultPayment = () => {
  return useMutation(async (params: { number: string; type: string }) => {
    const { data } = await api.post<ConsultPaymentType>(
      '/portal/payment/consult',
      params
    )
    return data
  })
}

const useSendPayment = () => {
  return useMutation(
    async (params: { number: string; type: string; pwd: string }) => {
      const { data } = await api.post('/portal/payment/pay', params)
      return data
    }
  )
}

export { useConsultPayment, useSendPayment }
