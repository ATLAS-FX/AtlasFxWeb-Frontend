import { api } from './api'

class UserApi {
  public async getInfo(params: { hash: string }) {
    const res = await api.post('/portal/get_info', params)
    return res.data
  }
}

export default new UserApi()
