import { IconBarCode, IconCopyPaste } from '@/components/icons'
import { ButtonAtlas, Container, Title } from '@/components/layout'
import { useAtlas } from '@/contexts/AtlasContext'
import { PaymentType } from '@/types/PaymentType'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from './PaymentForm'

const Payments: React.FC = () => {
  const { pixCopyPaste, setPixCopyPaste } = useAtlas()
  const navigate = useNavigate()
  const [stepPayment, setStepPayment] = useState<{
    step: number
    type: string
    textValue: string
    pwdCode: string
    stateModal: boolean
  }>({
    step: 0,
    type: pixCopyPaste ? 'pix' : '',
    textValue: '',
    pwdCode: '',
    stateModal: false
  })
  const [dataPayment, setDataPayment] = useState<PaymentType | undefined>()

  const listPaymentsActions = [
    {
      title: 'Copia e Cola',
      icon: IconCopyPaste,
      func: () => {
        setStepPayment((prev) => ({ ...prev, textValue: '', type: 'pix', step: 1 }))
      }
    },
    {
      title: 'Digitar código de barras',
      icon: IconBarCode,
      func: () => {
        setStepPayment((prev) => ({
          ...prev,
          textValue: '',
          type: 'boleto',
          step: 1
        }))
      }
    }
  ]

  return (
    <Container>
      <Title
        title="Pagamentos"
        subtitle="Pagamento 100% descomplicado."
        back={() =>
          pixCopyPaste
            ? setPixCopyPaste(false)
            : stepPayment.step <= 0
              ? navigate(-1)
              : setStepPayment((prev) => ({
                  ...prev,
                  step: prev.step - 1,
                  textValue: ''
                }))
        }
      />
      {stepPayment.step === 0 && !pixCopyPaste && (
        <>
          <h4 className="text-sm text-system-cinza">Escolha como pagar</h4>
          <div className="flex justify-evenly p-2">
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
          data={dataPayment}
          setData={setDataPayment}
        />
      )}
      {pixCopyPaste && (
        <PaymentForm
          flow={stepPayment}
          setFlow={setStepPayment}
          data={dataPayment}
          setData={setDataPayment}
        />
      )}
    </Container>
  )
}

export default Payments
