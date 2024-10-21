import { ThemeType, UserType } from '@/types/userType'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

interface UserContextData {
  user: UserType
  setUser: Dispatch<SetStateAction<UserType>>
  themeSystem: ThemeType
  setThemeSystem: Dispatch<SetStateAction<ThemeType>>
  pixCopyPaste: boolean
  setPixCopyPaste: Dispatch<SetStateAction<boolean>>
  currentStepEmail: number
  setCurrentStepEmail: Dispatch<SetStateAction<number>>
  currentStepProfile: number
  setCurrentStepProfile: Dispatch<SetStateAction<number>>
  token: string
  isAuthenticated: boolean | undefined
  signIn: (token: string) => void
  signOut: () => void
  checkUserIsAuthenticated: () => void
  checkTheme: (theme: ThemeType) => void
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

const initialUserState: UserType = {
  id: 0,
  bank: '',
  account: '',
  agency: '',
  amount: '',
  doc: '',
  name: '',
  email: '',
  street: '',
  st_comp: '',
  st_number: '',
  number: '',
  district: '',
  city: '',
  state: '',
  zip: '',
  uf: '',
  emailWhite: '',
  releases: []
}

const initialThemeState: ThemeType = {
  primary: '#243060',
  secondary: '#C8D753',
  thirdy: '#DDE2F0',
  background: '#EFEFEF',
  text_primary: '#243060',
  text_secondary: '#C8D753',
  systemName:
    import.meta.env.VITE_CLIENT_NAME === 'ATLAS' ? 'Atlas FX' : 'Carteira X'
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate()
  const [currentStepEmail, setCurrentStepEmail] = useState<number>(0)
  const [currentStepProfile, setCurrentStepProfile] = useState<number>(0)
  const [themeSystem, setThemeSystem] = useState<ThemeType>(initialThemeState)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [pixCopyPaste, setPixCopyPaste] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<UserType>(initialUserState)

  const signIn = (token: string) => {
    setIsAuthenticated(true)

    setToken(token)
    sessionStorage.setItem('atlas_token', token)
  }

  const signOut = () => {
    setIsAuthenticated(false)

    sessionStorage.removeItem('atlas_token')
    navigate('/login', { replace: true })
  }

  const checkUserIsAuthenticated = () => {
    const sessionToken = sessionStorage.getItem('atlas_token')
    const theme = sessionStorage.getItem('theme_org')
    if (theme) {
      const themeOrg = JSON.parse(theme)
      setThemeSystem((prev) => ({ ...prev, themeOrg }))
    }
    if (sessionToken !== null) {
      setToken(sessionToken)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const checkTheme = (theme: ThemeType) => {
    setThemeSystem(theme)
    sessionStorage.setItem('theme_org', JSON.stringify(theme))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        themeSystem,
        setThemeSystem,
        currentStepEmail,
        setCurrentStepEmail,
        pixCopyPaste,
        setPixCopyPaste,
        currentStepProfile,
        setCurrentStepProfile,
        isAuthenticated,
        signIn,
        signOut,
        token,
        checkUserIsAuthenticated,
        checkTheme
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAtlas = () => {
  return useContext(UserContext)
}
