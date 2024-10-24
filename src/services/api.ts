import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env[`VITE_API_BASE_${import.meta.env.VITE_CLIENT_NAME}`]}`
})

api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('atlas_token')

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`
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
    if (error.response.status && error.response.data.error === 'access denied') {
      sessionStorage.removeItem('atlas_token')
      toast({
        variant: 'destructive',
        title: 'Você foi desconectado.',
        description: 'Faça login novamente.'
      })
      window.location.href = 'login'
    }
    return Promise.reject(error)
  }
)
