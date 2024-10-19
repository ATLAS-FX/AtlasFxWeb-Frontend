import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import CarteiraX_Favicon from './assets/logos/cx_branca.svg'
import Atlas_Favicon from './assets/logos/fx_verde_claro.svg'
import { Toaster } from './components/ui/toaster.tsx'
import { useAtlas, UserProvider } from './contexts/AtlasContext.tsx'
import { setColorVariables } from './contexts/setColors.tsx'
import './styles/global.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

const CheckTheme = () => {
  const { themeSystem, setThemeSystem } = useAtlas()
  setColorVariables(themeSystem)

  if (import.meta.env.VITE_CLIENT_NAME === 'ATLAS') {
    const favicon = document.querySelector(
      'link[rel="icon"]'
    ) as HTMLLinkElement | null
    if (favicon) {
      favicon.href = Atlas_Favicon
    }
    document.title = 'Atlas FX'
    if (!themeSystem.systemName) {
      setThemeSystem({ ...themeSystem, systemName: 'Atlas FX' })
    }
  }

  if (import.meta.env.VITE_CLIENT_NAME === 'CARTEIRAX') {
    const favicon = document.querySelector(
      'link[rel="icon"]'
    ) as HTMLLinkElement | null
    if (favicon) {
      favicon.href = CarteiraX_Favicon
    }
    document.title = 'Carteira X'
    if (!themeSystem.systemName) {
      setThemeSystem({ ...themeSystem, systemName: 'Carteira X' })
    }
  }

  return (
    <>
      <App />
      <Toaster />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <CheckTheme />
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
)
