import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('atlas_token')

    if (accessToken) {
      // config.headers.Authorization = `Bearer ${accessToken}`
      config.headers['key'] = accessToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.data.error === 'access denied') {
      localStorage.removeItem('atlas_token')
      toast({
        variant: 'destructive',
        title: 'Você foi desconectado.',
        description: 'Faça login novamente.'
      })
    }
    return Promise.reject(error)
  }
)
