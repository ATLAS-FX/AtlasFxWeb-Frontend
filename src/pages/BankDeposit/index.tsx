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
  const [stepBankDeposit, setStepBankDeposit] = useState<{
    typePayment: string
    stepPage: number
    selectPayment: number
  }>({ typePayment: '', selectPayment: 0, stepPage: 0 })
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
    console.log(stepBankDeposit)
  }, [isError, stepBankDeposit])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <AdminContainer>
          <Title
            text="Depositar"
            back={() =>
              stepBankDeposit.stepPage <= 0
                ? navigate(-1)
                : setStepBankDeposit((prev) => ({
                    ...prev,
                    stepPage: prev.stepPage - 1
                  }))
            }
          />
          {stepBankDeposit.stepPage === 0 && (
            <ProfileBankDeposit
              key={infoBankDeposit?.id}
              step={stepBankDeposit}
              setStep={setStepBankDeposit}
              name={infoBankDeposit?.name || ''}
              cnpj={infoBankDeposit?.doc || ''}
              bank={infoBankDeposit?.bank || ''}
              agency={infoBankDeposit?.agency || ''}
              account={infoBankDeposit?.account || ''}
              amountState={amountBankDeposit}
              SetAmountState={setAmountBankDeposit}
            />
          )}
          {stepBankDeposit.stepPage === 1 && (
            <PaymentBankDeposit
              amount={amountBankDeposit}
              type={stepBankDeposit.typePayment}
            />
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default BankDeposit
