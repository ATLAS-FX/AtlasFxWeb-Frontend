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
}

export default new UserApi()
