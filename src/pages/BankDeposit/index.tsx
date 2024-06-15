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
    amount: string
    key: string
    barcode: string
    qrcode: string
    loading: boolean
  }>({
    typePayment: '',
    stepPage: 0,
    selectPayment: 0,
    amount: '0,00',
    key: '',
    barcode: '',
    qrcode: '',
    loading: false
  })

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
              stepBankDeposit.selectPayment === 0 && stepBankDeposit.stepPage === 0
                ? navigate(-1)
                : stepBankDeposit.selectPayment > 0 && stepBankDeposit.stepPage > 0
                  ? setStepBankDeposit((prev) => ({
                      ...prev,
                      typePayment: '',
                      selectPayment: 1,
                      stepPage: 0,
                      amount: '0,00',
                      barcode: '',
                      key: '',
                      qrcode: ''
                    }))
                  : setStepBankDeposit((prev) => ({
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
          {stepBankDeposit.stepPage === 0 && (
            <ProfileBankDeposit
              key={infoBankDeposit?.id}
              state={stepBankDeposit}
              setState={setStepBankDeposit}
              name={infoBankDeposit?.name || ''}
              cnpj={infoBankDeposit?.doc || ''}
              bank={infoBankDeposit?.bank || ''}
              agency={infoBankDeposit?.agency || ''}
              account={infoBankDeposit?.account || ''}
            />
          )}
          {stepBankDeposit.stepPage === 1 && (
            <PaymentBankDeposit
              amount={stepBankDeposit.amount}
              type={stepBankDeposit.typePayment}
              barcode={stepBankDeposit.barcode}
              qrcode={stepBankDeposit.qrcode}
            />
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default BankDeposit
