import { api } from './api'

class TransferApi {
  public async sendTED(params: App.TransferProps) {
    const res = await api.post('portal/ted/send', params)
    return res.data
  }
}

export default new TransferApi()
