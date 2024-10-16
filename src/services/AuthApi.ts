import { useMutation, useQuery } from 'react-query'
import { api } from './api'

const useGetCode = () => {
  return useQuery(['get-code'], async () => {
    const { data } = await api.get<{ hash: string }>('/actions/gen_code')
    return data
  })
}

const useCredentials = () => {
  return useMutation(async (params: { doc: string; pwd: string }) => {
    const { data } = await api.post('/actions/login_company', params)
    return data
  })
}

const useGetKey = () => {
  return useMutation(async (params: { id: number }) => {
    const { data } = await api.post('/portal/get_key', params)
    return data
  })
}

const useCheckHash = () => {
  return useMutation(async (params: { hash: string }) => {
    const { data } = await api.post('/actions/check_hash', params)
    return data
  })
}

export { useCredentials, useCheckHash, useGetCode, useGetKey }
