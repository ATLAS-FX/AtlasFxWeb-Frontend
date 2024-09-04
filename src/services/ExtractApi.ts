import { ExtractType } from '@/types/Extract'
import { api } from './api'

class ExtractApi {
  public async getExtractInfo(params: { start: string; end: string; type: string }) {
    const res = await api.post<ExtractType>('portal/extract', params)
    return res.data
  }
}

export default new ExtractApi()
