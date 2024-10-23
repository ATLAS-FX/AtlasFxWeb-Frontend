import { IconBarCode, IconCopyPaste } from '@/components/icons'
import { ButtonAtlas, Container, Title } from '@/components/layout'
import { useAtlas } from '@/contexts/AtlasContext'
import { ConsultPaymentType } from '@/types/PaymentType'
import { PaymentStateType } from '@/types/StatesType'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPagePayment from './FormPagePayment'

const HomePagePayment: React.FC = () => {
  const { controlAtlas, setControlAtlas } = useAtlas()
  const navigate = useNavigate()
  const [stepPayment, setStepPayment] = useState<PaymentStateType>({
    step: 0,
    type: controlAtlas.pixCopyPaste ? 'pix' : '',
    textValue: '',
    pwdCode: '',
    stateModal: false
  })
  const [dataPayment, setDataPayment] = useState<ConsultPaymentType | undefined>()

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
          controlAtlas.pixCopyPaste
            ? setControlAtlas((prev) => ({ ...prev, pixCopyPaste: false }))
            : stepPayment.step <= 0
              ? navigate(-1)
              : setStepPayment((prev) => ({
                  ...prev,
                  step: prev.step - 1,
                  textValue: ''
                }))
        }
      />
      {stepPayment.step === 0 && !controlAtlas.pixCopyPaste && (
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
        <FormPagePayment
          flow={stepPayment}
          setFlow={setStepPayment}
          data={dataPayment}
          setData={setDataPayment}
        />
      )}
      {controlAtlas.pixCopyPaste && (
        <FormPagePayment
          flow={stepPayment}
          setFlow={setStepPayment}
          data={dataPayment}
          setData={setDataPayment}
        />
      )}
    </Container>
  )
}

export default HomePagePayment
