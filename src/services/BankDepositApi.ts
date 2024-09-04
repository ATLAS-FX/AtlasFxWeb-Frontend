import { BankDepositType } from '@/types/DepositType'
import { api } from './api'

class BankDepositApi {
  public async getBankDepositInfo() {
    const res = await api.post<BankDepositType>('portal/deposit/info')
    return res.data
  }

  public async createBarCode(params: { amount: string }) {
    const res = await api.post('portal/deposit/barcode', params)
    return res.data
  }

  public async createQrCode(params: { amount: string }) {
    const res = await api.post('portal/deposit/qrcode', params)
    return res.data
  }
}

export default new BankDepositApi()
