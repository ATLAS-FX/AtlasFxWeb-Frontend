import { UserType } from '@/types/userType'
import { useMutation, useQuery } from 'react-query'
import { api } from './api'

const getInfoUser = () => {
  return useQuery('get-info-user', async () => {
    const { data } = await api.get<UserType>('/portal/get_info')
    return data
  })
}

const getProfile = () => {
  return useQuery('get-info-user', async () => {
    const { data } = await api.get<UserType>('/portal/perfil/list')
    return data
  })
}

const getAddressCode = () => {
  return useMutation(async () => {
    const { data } = await api.post('/portal/perfil/address_mail')
    return data
  })
}

const checkAddressCode = () => {
  return useMutation(async (params: { code: string }) => {
    const { data } = await api.post('/portal/perfil/check_code', params)
    return data
  })
}

const updateAddress = () => {
  return useMutation(
    async (params: {
      code: string
      zip: string
      street: string
      state: string
      st_comp: string
      st_number: string
      district: string
      city: string
      uf: string
      pwd: string
    }) => {
      const { data } = await api.post('/portal/perfil/update_address', params)
      return data
    }
  )
}

export { checkAddressCode, getAddressCode, getInfoUser, getProfile, updateAddress }
