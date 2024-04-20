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
  user: App.UserProps
  setUser: Dispatch<SetStateAction<App.UserProps>>
  currentStepEmail: number
  setCurrentStepEmail: Dispatch<SetStateAction<number>>
  currentStepProfile: number
  setCurrentStepProfile: Dispatch<SetStateAction<number>>
  isAuthenticated: boolean
  token: string
  signIn: (token: string) => void
  signOut: () => void
  checkUserIsAuthenticated: () => void
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate()
  const [currentStepEmail, setCurrentStepEmail] = useState<number>(0)
  const [currentStepProfile, setCurrentStepProfile] = useState<number>(0)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<App.UserProps>({
    id: 0,
    account: '',
    agency: '',
    amount: '',
    name: '',
    releases: []
  })

  const signIn = (token: string) => {
    setIsAuthenticated(true)

    setToken(token)
    localStorage.setItem('atlas_token', token)
  }

  const signOut = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('atlas_token')
    navigate('/login')
  }

  const checkUserIsAuthenticated = () => {
    const localToken = localStorage.getItem('atlas_token')
    if (localToken !== null) {
      setToken(localToken)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentStepEmail,
        setCurrentStepEmail,
        currentStepProfile,
        setCurrentStepProfile,
        isAuthenticated,
        signIn,
        signOut,
        token,
        checkUserIsAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAdm = () => {
  return useContext(UserContext)
}
