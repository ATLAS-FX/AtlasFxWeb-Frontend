import { api } from './api'

class UserApi {
  public async getInfo() {
    const res = await api.get('/portal/get_info')
    return res.data
  }
}

export default new UserApi()
