import { useEffect, useState } from 'react'
import IconLoading from './components/icons/Loading'
import { useAtlas } from './contexts/AtlasContext'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
import { api } from './services/api'
import { ThemeType } from './types/userType'

function App() {
  const { checkUserIsAuthenticated, isAuthenticated, themeSystem, checkTheme } =
    useAtlas()
  const theme = sessionStorage.getItem('theme_org')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTheme = async () => {
    try {
      const { data } = await api.get<ThemeType>('/actions/theme')
      return data
    } catch (error) {
      console.error('Error fetching theme:', error)
      return themeSystem
    }
  }

  useEffect(() => {
    const initialize = async () => {
      checkUserIsAuthenticated()

      if (theme === null) {
        setLoading(true)
        const data = await fetchTheme()
        checkTheme(data)
        setLoading(false)
      }
    }

    initialize()
  }, [])

  if (loading) {
    return (
      <div className="bg-system-gray1 grid h-dvh w-dvw place-items-center">
        <IconLoading className="size-20 fill-white text-primary-default" />
      </div>
    )
  }

  return (
    <>
      {isAuthenticated === true && <PrivateRoutes />}
      {isAuthenticated === false && <PublicRoutes />}
    </>
  )
}

export default App
