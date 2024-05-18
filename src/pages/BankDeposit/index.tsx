import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import BankDepositApi from '@/services/BankDepositApi'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import PaymentBankDeposit from './PaymentBankDeposit'
import ProfileBankDeposit from './ProfileBankDeposit'

const BankDeposit: React.FC = () => {
  const navigate = useNavigate()
  const [stepBankDeposit, setStepBankDeposit] = useState<number>(0)
  const [typePayment, setTypePayment] = useState<string>('')
  const [amountBankDeposit, setAmountBankDeposit] = useState<string>('')

  const {
    data: infoBankDeposit,
    isLoading,
    isError
  } = useQuery({
    queryKey: 'list-deposit',
    queryFn: async () => {
      const res = await BankDepositApi.getBankDepositInfo()
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
          {stepBankDeposit === 0 && (
            <ProfileBankDeposit
              key={infoBankDeposit?.id}
              step={setStepBankDeposit}
              name={infoBankDeposit?.name || ''}
              cnpj={infoBankDeposit?.doc || ''}
              bank={infoBankDeposit?.bank || ''}
              agency={infoBankDeposit?.agency || ''}
              account={infoBankDeposit?.account || ''}
              amountState={amountBankDeposit}
              SetAmountState={setAmountBankDeposit}
              SetType={setTypePayment}
            />
          )}
          {stepBankDeposit === 1 && (
            <PaymentBankDeposit amount={amountBankDeposit} type={typePayment} />
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default BankDeposit
