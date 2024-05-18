import { api } from './api'

class PaymentApi {
  public async consultPayment(params: {
    number: string
    type: string
  }): Promise<App.PaymentProps> {
    const res = await api.post('portal/payment/consult', params)
    return res.data
  }
  public async sendPayment(params: { number: string; type: string; pwd: string }) {
    const res = await api.post('portal/payment/pay', params)
    return res.data
  }
}

export default new PaymentApi()
