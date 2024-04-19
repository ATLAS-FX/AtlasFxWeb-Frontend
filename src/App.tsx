import { useAdm } from './contexts/UserContext'
import { Routes } from './routes'
import { AuthRoutes } from './routes/AuthRoutes'

function App() {
  const { isAuthenticated } = useAdm()

  return (
    <>
      {isAuthenticated === true && <Routes />}
      {isAuthenticated === false && <AuthRoutes />}
    </>
  )
}

export default App
