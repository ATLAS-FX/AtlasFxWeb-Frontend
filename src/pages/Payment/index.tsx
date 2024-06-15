import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconBarCode } from '@/components/icons/BarCode'
import { IconPix } from '@/components/icons/Pix'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from './PaymentForm'
import PaymentSuccess from './PaymentSuccess'

const Payments: React.FC = () => {
  const navigate = useNavigate()
  const [stepPayment, setStepPayment] = useState<{
    step: number
    type: string
    textValue: string
    pwdCode: string
    loading: boolean
  }>({
    step: 0,
    type: '',
    textValue: '',
    pwdCode: '',
    loading: false
  })
  const [dataPayment, setDataPayment] = useState<App.PaymentProps | undefined>()

  const listPaymentsActions = [
    {
      title: 'Digitar código de barras',
      icon: IconBarCode,
      func: () => {
        setStepPayment((prev) => ({ ...prev, type: 'boleto', step: 1 }))
      }
    },
    {
      title: 'Pix Copia e Cola',
      icon: IconPix,
      func: () => {
        setStepPayment((prev) => ({ ...prev, type: 'pix', step: 1 }))
      }
    }
  ]

  return (
    <AdminContainer>
      <Title
        text="Pagamentos"
        back={() =>
          stepPayment.step <= 0
            ? navigate(-1)
            : setStepPayment((prev) => ({
                ...prev,
                step: prev.step - 1,
                textValue: ''
              }))
        }
      />
      {stepPayment.step === 0 && (
        <>
          <h4 className="text-base font-medium">Escolha como pagar</h4>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentsActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
        </>
      )}
      {stepPayment.step === 1 && (
        <PaymentForm
          flow={stepPayment}
          setFlow={setStepPayment}
          setData={setDataPayment}
          data={dataPayment}
        />
      )}
      {stepPayment.step === 2 && (
        <PaymentSuccess
          type={stepPayment.type}
          amount={dataPayment?.price.toString() || ''}
          name={dataPayment?.owner.toString() || ''}
          document={dataPayment?.document || ''}
          barcode={dataPayment?.barcode || ''}
          expired=""
          time={''}
        />
      )}
    </AdminContainer>
  )
}

export default Payments
