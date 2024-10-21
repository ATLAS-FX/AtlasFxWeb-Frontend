import { ContactsPixType, KeyPixType, PixType, SendPixType } from '@/types/PixType'
import { useMutation, useQuery } from 'react-query'
import { api } from './api'

const useListKeys = () => {
  return useQuery('list-my-keys', async () => {
    const { data } = await api.get<KeyPixType[]>('/portal/pix/my_keys')
    return data
  })
}

const useListContacts = () => {
  return useQuery('list-contacts', async () => {
    const { data } = await api.get<ContactsPixType[]>('/portal/contacts/list')
    return data
  })
}

const useGetKeyInfo = () => {
  return useMutation(async (params: { key: string }) => {
    const { data } = await api.post<PixType>('/portal/pix/key_info', params)
    return data
  })
}

const useCreatedKeyPix = () => {
  return useMutation(async (params: { key_code: string; key_type: string }) => {
    const { data } = await api.post('/portal/pix/create_key', params)
    return data
  })
}

const useConfirmCreatedKeyPix = () => {
  return useMutation(async (params: { type: string; code: string }) => {
    const { data } = await api.post('/portal/pix/confirm_key', params)
    return data
  })
}

const useSendPix = () => {
  return useMutation(
    async (params: {
      key: string
      amount: number
      desc: string
      save: number
      pwd: string
    }) => {
      const { data } = await api.post<SendPixType>('/portal/pix/send', params)
      return data
    }
  )
}

const useDeletePixKey = () => {
  return useMutation(async (params: { id: string }) => {
    const { data } = await api.post('/portal/pix/delete_key', params)
    return data
  })
}

const useDeleteContact = () => {
  return useMutation(async (params: { id: string }) => {
    const { data } = await api.post('/portal/contacts/list', params)
    return data
  })
}

export {
  useConfirmCreatedKeyPix,
  useCreatedKeyPix,
  useDeleteContact,
  useDeletePixKey,
  useGetKeyInfo,
  useListContacts,
  useListKeys,
  useSendPix
}
