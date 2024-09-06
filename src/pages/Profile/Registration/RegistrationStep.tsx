import { Container, Title } from '@/components/layout'
import { toast } from '@/components/ui/use-toast'
import UserApi from '@/services/UserApi'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

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
    <Container>
      <Title
        title="Meu Perfil"
        subtitle="Gerencie seu perfil"
        back={() => navigate(-1)}
      />
      <div className="">
        <h3>Dados cadastrais</h3>
      </div>
    </Container>
  )
}

export default RegistrationStep
