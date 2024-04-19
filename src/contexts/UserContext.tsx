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
  currentStepEmail: {
    step: number
    type: string
  }
  setCurrentStepEmail: Dispatch<
    SetStateAction<{
      step: number
      type: string
    }>
  >
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
  const [currentStepEmail, setCurrentStepEmail] = useState<{
    step: number
    type: string
  }>({ step: 1, type: '' })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState('')

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
        currentStepEmail,
        setCurrentStepEmail,
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
