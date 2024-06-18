import { api } from './api'

class AuthApi {
  public async getCode(): Promise<{ hash: string }> {
    const res = await api.get('/actions/gen_code')
    return res.data
  }

  public async getKey(params: { id: number }) {
    const res = await api.post('/portal/get_key', params)
    return res.data
  }

  public async checkHash(params: { hash: string }) {
    const res = await api.post('/actions/check_hash', params)
    return res.data
  }
}

export default new AuthApi()
