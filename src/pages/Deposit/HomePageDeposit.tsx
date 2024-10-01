import { Container, Title } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useDepositInfo } from '@/services/DepositApi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePageDeposit from './ProfilePageDeposit'

const HomePageDeposit: React.FC = () => {
  const navigate = useNavigate()
  const { data: deposit, isLoading, isError } = useDepositInfo()
  const [stepDeposit, setStepDeposit] = useState<{
    typePayment: string
    stepPage: number
    selectPayment: number
    amount: string
    key: string
    barcode: string
    qrcode: string
    modal: boolean
  }>({
    typePayment: '',
    stepPage: 0,
    selectPayment: 0,
    amount: '0,00',
    key: '',
    barcode: '',
    qrcode: '',
    modal: false
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: '  Por favor tente mais tarde!'
      })
    }
  }, [isError, stepDeposit])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <Container>
          <Title
            title="Depositar"
            subtitle="Deposite seu dinheiro com segurança."
            back={() =>
              stepDeposit.selectPayment === 0 && stepDeposit.stepPage === 0
                ? navigate(-1)
                : stepDeposit.selectPayment > 0 && stepDeposit.stepPage > 0
                  ? setStepDeposit((prev) => ({
                      ...prev,
                      typePayment: '',
                      selectPayment: 1,
                      stepPage: 0,
                      amount: '0,00',
                      barcode: '',
                      key: '',
                      qrcode: ''
                    }))
                  : setStepDeposit((prev) => ({
                      ...prev,
                      selectPayment: 0,
                      stepPage: 0,
                      amount: '0,00',
                      barcode: '',
                      key: '',
                      qrcode: ''
                    }))
            }
          />
          {stepDeposit.stepPage === 0 && (
            <ProfilePageDeposit
              key={deposit?.id}
              state={stepDeposit}
              setState={setStepDeposit}
              name={deposit?.name || ''}
              cnpj={deposit?.doc || ''}
              bank={deposit?.bank || ''}
              agency={deposit?.agency || ''}
              account={deposit?.account || ''}
            />
          )}
        </Container>
      )}
    </>
  )
}

export default HomePageDeposit
