import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

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
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentStepEmail, setCurrentStepEmail] = useState<{
    step: number
    type: string
  }>({ step: 1, type: '' })

  return (
    <UserContext.Provider
      value={{
        currentStepEmail,
        setCurrentStepEmail
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useAdm = () => {
  return useContext(UserContext)
}
