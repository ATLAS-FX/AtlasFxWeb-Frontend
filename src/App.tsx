import { useEffect } from 'react'
import { useAtlas } from './contexts/AtlasContext'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { PublicRoutes } from './routes/PublicRoutes'

function App() {
  const { checkUserIsAuthenticated, isAuthenticated } = useAtlas()

  useEffect(() => {
    checkUserIsAuthenticated()
  }, [])

  return (
    <>
      {isAuthenticated === true && <PrivateRoutes />}
      {isAuthenticated === false && <PublicRoutes />}
    </>
  )
}

export default App
