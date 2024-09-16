import { UserType } from '@/types/userType'
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
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate()
  const [currentStepEmail, setCurrentStepEmail] = useState<number>(0)
  const [currentStepProfile, setCurrentStepProfile] = useState<number>(0)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [pixCopyPaste, setPixCopyPaste] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<UserType>({
    id: 0,
    bank: '',
    account: '',
    agency: '',
    amount: '',
    doc: '',
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
    navigate('/login', { replace: true })
  }

  const checkUserIsAuthenticated = () => {
    // const localToken = localStorage.getItem('atlas_token')
    // if (localToken !== null) {
    //   setToken(localToken)
    setIsAuthenticated(true)
    // } else {
    // setIsAuthenticated(false)
    // }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
        checkUserIsAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAtlas = () => {
  return useContext(UserContext)
}
