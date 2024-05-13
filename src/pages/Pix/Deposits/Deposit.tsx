import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import DepositApi from '@/services/DepositApi'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import DepositProfile from './DepositProfile'
import PaymentDeposit from './PaymentDeposit'

const Deposit: React.FC = () => {
  const navigate = useNavigate()
  const [stepDeposit, setStepDeposit] = useState<number>(0)
  const [typePayment, setTypePayment] = useState<string>('')
  const [amountDeposit, setAmountDeposit] = useState<string>('')

  const {
    data: infoDeposit,
    isLoading,
    isError
  } = useQuery({
    queryKey: 'list-deposit',
    queryFn: async () => {
      const res = await DepositApi.getDepositInfo()
      return res
    }
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: '  Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <AdminContainer>
          <Title text="Depositar" back={() => navigate(-1)} />
          {stepDeposit === 0 && (
            <DepositProfile
              key={infoDeposit?.id}
              step={setStepDeposit}
              name={infoDeposit?.name || ''}
              cnpj={infoDeposit?.cnpj || ''}
              bank={infoDeposit?.bank || ''}
              agency={infoDeposit?.agency || ''}
              account={infoDeposit?.account || ''}
              amountState={amountDeposit}
              SetAmountState={setAmountDeposit}
              SetType={setTypePayment}
            />
          )}
          {stepDeposit === 1 && (
            <PaymentDeposit amount={amountDeposit} type={typePayment} />
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default Deposit
