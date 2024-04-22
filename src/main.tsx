import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import './styles/global.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Suspense
            fallback={
              <iframe
                src="https://giphy.com/embed/l0GRk3KHYv2W6hmJG"
                width="480"
                height="480"
                allowFullScreen
              />
            }
          >
            <App />
            <Toaster />
          </Suspense>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
)
