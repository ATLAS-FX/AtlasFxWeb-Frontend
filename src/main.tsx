import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { UserProvider } from './contexts/AtlasContext.tsx'
import './styles/global.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <App />
            <Toaster />
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
)
