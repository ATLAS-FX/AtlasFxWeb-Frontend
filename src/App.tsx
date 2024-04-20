import { useEffect } from 'react'
import { useAdm } from './contexts/UserContext'
import { Routes } from './routes'
import { AuthRoutes } from './routes/AuthRoutes'

function App() {
  const { isAuthenticated, checkUserIsAuthenticated } = useAdm()

  useEffect(() => {
    checkUserIsAuthenticated()
  }, [])

  return (
    <>
      {isAuthenticated === true && <Routes />}
      {isAuthenticated === false && <AuthRoutes />}
    </>
  )
}

export default App
