import { useEffect } from 'react'
import { useAdm } from './contexts/UserContext'
import { AdminRoutes } from './routes/AdminRoutes'
import { AuthRoutes } from './routes/AuthRoutes'

function App() {
  const { checkUserIsAuthenticated, isAuthenticated } = useAdm()

  useEffect(() => {
    checkUserIsAuthenticated()
  }, [])

  return <>{isAuthenticated ? <AdminRoutes /> : <AuthRoutes />}</>
}

export default App
