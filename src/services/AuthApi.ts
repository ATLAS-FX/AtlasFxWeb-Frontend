import { api } from './api'

class AuthApi {
  public async getQrCode(): Promise<{ hash: string }> {
    const res = await api.get('/actions/gen_code')
    return res.data
  }

  public async checkHash() {
    const res = await api.post('/actions/check_hash')
    return res.data
  }
}

export default new AuthApi()
