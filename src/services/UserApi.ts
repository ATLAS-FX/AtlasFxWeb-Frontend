import { api } from './api'

class UserApi {
  public async getInfo(): Promise<App.UserProps> {
    const res = await api.get('/portal/get_info')
    return res.data
  }

  public async getProfile(): Promise<App.ProfileProps> {
    const res = await api.get('/portal/perfil/list')
    return res.data
  }

  public async getAddressCode() {
    const res = await api.post('portal/perfil/address_mail')
    return res.data
  }

  public async checkAddressCode(params: { code: string }) {
    const res = await api.post('portal/perfil/check_code', params)
    return res.data
  }

  public async updateAddress(params: {
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
  }) {
    const res = await api.post('portal/perfil/update_address', params)
    return res.data
  }
}

export default new UserApi()
