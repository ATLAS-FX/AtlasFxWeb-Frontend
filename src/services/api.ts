import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { redirect } from 'react-router-dom'

export const api = axios.create({
  baseURL: 'https://backendserver.cloud/atlas/'
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('atlas_pj')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
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
      localStorage.removeItem('atlas_pj')
      toast({
        variant: 'destructive',
        title: 'Você foi desconectado.',
        description: 'Faça login novamente.'
      })
      redirect('/login')
    }
    return Promise.reject(error)
  }
)
