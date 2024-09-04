import { ContactsPixType, KeyPixType, PixType } from '@/types/PixType'
import { api } from './api'

class UserApi {
  public async getKeyInfo(params: { key: string }): Promise<PixType> {
    const res = await api.post('portal/pix/key_info', params)
    return res.data
  }

  public async listPixKeys(): Promise<KeyPixType[]> {
    const res = await api.get('portal/pix/my_keys')
    return res.data
  }

  public async listPixContacts(): Promise<ContactsPixType[]> {
    const res = await api.get('portal/contacts/list')
    return res.data
  }

  public async createdKeyPix(params: { key_type: string; key_code: string }) {
    const res = await api.post('portal/pix/create_key', params)
    return res.data
  }

  public async confirmCreatedKeyPix(params: { type: string; code: string }) {
    const res = await api.post('portal/pix/confirm_key', params)
    return res.data
  }

  public async sendPix(params: {
    key: string
    amount: number
    desc: string
    save: number
    pwd: string
  }) {
    const res = await api.post('portal/pix/send', params)
    return res.data
  }

  public async deletePixKey(params: { id: string }) {
    const res = await api.post('portal/pix/delete_key', params)
    return res.data
  }
}

export default new UserApi()
