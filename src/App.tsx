import { useState } from 'react'
import { Routes } from './routes'
import { AuthRoutes } from './routes/AuthRoutes'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  console.log(isAuthenticated)
  return (
    <>
      {isAuthenticated === true && <Routes />}
      {isAuthenticated === false && <AuthRoutes />}
    </>
  )
}

export default App
