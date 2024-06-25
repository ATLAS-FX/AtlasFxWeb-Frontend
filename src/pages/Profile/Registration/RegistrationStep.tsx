import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import UserApi from '@/services/UserApi'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { RegistratrionChange } from './RegistrationChange'
import { RegistratrionCode } from './RegistrationCode'
import { RegistrationForm } from './RegistrationForm'
import { RegistratrionSucess } from './RegistrationSuccess'

const RegistrationStep: React.FC = () => {
  const navigate = useNavigate()
  const [changeAddressStep, setChangeAddressStep] = useState<number>(0)
  const [getCodeAddress, setGetCodeAddress] = useState<string>('')

  const {
    data: profile,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: 'get-profile',
    queryFn: async () => {
      const res = await UserApi.getProfile()
      return res
    }
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <AdminContainer>
          <Title
            text={changeAddressStep < 1 ? 'Dados cadastrais' : 'Alterar endereço'}
            back={
              changeAddressStep < 1
                ? () => navigate(-1)
                : () => setChangeAddressStep((prevState) => prevState - 1)
            }
          />
          {changeAddressStep === 0 ? (
            <RegistratrionChange
              key={1}
              profile={profile || null}
              step={setChangeAddressStep}
            />
          ) : changeAddressStep === 1 ? (
            <RegistratrionCode
              key={2}
              name={profile?.name || ''}
              agency={profile?.agency || ''}
              account={profile?.account || ''}
              code={getCodeAddress}
              setCode={setGetCodeAddress}
              step={setChangeAddressStep}
            />
          ) : changeAddressStep === 2 ? (
            <RegistrationForm
              key={3}
              step={setChangeAddressStep}
              code={getCodeAddress}
              refetch={refetch}
            />
          ) : (
            changeAddressStep === 3 && <RegistratrionSucess key={4} />
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default RegistrationStep
