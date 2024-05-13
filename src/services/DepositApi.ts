import { api } from './api'

class DepositApi {
  public async getDepositInfo() {
    const res = await api.post<App.DepositProps>('portal/deposit/info')
    return res.data
  }

  public async createBarCode(params: { amount: string }) {
    const res = await api.post('portal/deposit/barcode', params)
    return res.data
  }
}

export default new DepositApi()
