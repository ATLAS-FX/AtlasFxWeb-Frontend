import { ButtonNext, InputFx, TextAreaFX } from '@/components/layout'
import { toast } from '@/components/ui/use-toast'
import { useConsultPayment, useSendPayment } from '@/services/PaymentApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { ConsultPaymentType } from '@/types/PaymentType'
import { PaymentStateType } from '@/types/StatesType'
import md5 from 'md5'
import { Dispatch, SetStateAction } from 'react'
import ModalPayment from './ModalPayment'

interface IPaymentForm {
  flow: PaymentStateType
  setFlow: Dispatch<SetStateAction<PaymentStateType>>
  data: ConsultPaymentType | undefined
  setData: Dispatch<SetStateAction<ConsultPaymentType | undefined>>
}

const FormPagePayment: React.FC<IPaymentForm> = ({
  flow,
  setFlow,
  data,
  setData
}) => {
  const { mutate: consultPayment, isLoading: sendConsult } = useConsultPayment()
  const { mutate: sendPayment } = useSendPayment()

  const formatLineDigit = (value: string): string => {
    // Remover todos os caracteres não numéricos
    value = value.replace(/\D/g, '')

    // Adicionar os pontos e espaços conforme necessário
    value = value.replace(/^(\d{5})(\d)/, '$1.$2')
    value = value.replace(/^(\d{5}\.\d{5})(\d)/, '$1 $2')
    value = value.replace(/^(\d{5}\.\d{5} \d{5})(\d)/, '$1.$2')
    value = value.replace(/^(\d{5}\.\d{5} \d{5}\.\d{6})(\d)/, '$1 $2')
    value = value.replace(/^(\d{5}\.\d{5} \d{5}\.\d{6} \d{5})(\d)/, '$1.$2')
    value = value.replace(/^(\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6})(\d)/, '$1 $2')
    value = value.replace(
      /^(\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d)(\d)/,
      '$1 $2'
    )
    return value
  }

  const handleTextChange = (e: string) => {
    let value = e
    if (flow.type === 'boleto') {
      value = formatLineDigit(value)
    }
    setFlow((prev) => ({ ...prev, textValue: value }))
  }

  const handleConsultPayment = async () => {
    consultPayment(
      {
        number: flow.textValue,
        type: flow.type
      },
      {
        onSuccess: (res) => {
          setFlow((prev) => ({ ...prev, stateModal: true }))
          setData(res)
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  const handleSendPayment = async () => {
    sendPayment(
      {
        number: flow.textValue,
        type: flow.type,
        pwd: md5(flow.pwdCode)
      },
      {
        onSuccess: () => {
          setFlow({ ...flow, step: 2, stateModal: true })
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  return (
    <>
      {flow.type === 'boleto' ? (
        <TextAreaFX
          name={'text-boleto'}
          label={'Digite o código de barras'}
          maxLength={flow.type === 'boleto' ? 51 : 2000}
          value={flow.textValue}
          change={(e) => handleTextChange(e)}
        />
      ) : (
        <InputFx
          name={'input-copypaste'}
          label={'Cole o Pix'}
          value={flow.textValue}
          change={(e: string) => {
            setFlow((prev) => ({ ...prev, textValue: e }))
          }}
        />
      )}
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir"
          disabled={
            flow.type === 'boleto'
              ? flow.textValue.length <= 50
              : flow.textValue.length <= 1
          }
          loading={sendConsult}
          func={handleConsultPayment}
        />
      </div>
      <ModalPayment
        data={data}
        state={flow}
        setState={setFlow}
        ConsultPaymentFunc={handleConsultPayment}
        SendPaymentFunc={handleSendPayment}
      />
      {/* {stepPayment.step === 2 && (
        <PaymentSuccess
          type={stepPayment.type}
          amount={dataPayment?.price.toString() || ''}
          name={dataPayment?.owner.toString() || ''}
          document={dataPayment?.document || ''}
          barcode={dataPayment?.barcode || ''}
          expired=""
          time={''}
        />
      )} */}
    </>
  )
}

export default FormPagePayment
