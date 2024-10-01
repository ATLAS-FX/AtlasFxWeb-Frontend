import { ButtonNext } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useConsultPayment, useSendPayment } from '@/services/PaymentApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { PaymentType } from '@/types/PaymentType'
import md5 from 'md5'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ModalPayment from './ModalPayment'

interface IPaymentForm {
  flow: {
    step: number
    type: string
    textValue: string
    pwdCode: string
    stateModal: boolean
  }
  setFlow: Dispatch<
    SetStateAction<{
      step: number
      type: string
      textValue: string
      pwdCode: string
      stateModal: boolean
    }>
  >
  data: PaymentType | undefined
  setData: Dispatch<SetStateAction<PaymentType | undefined>>
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

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value
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
      <h4 className="text-base font-medium text-system-cinza">
        {flow.type === 'boleto' ? 'Digite o código de barras' : 'Cole o Pix'}
      </h4>
      <div className="flex flex-col gap-2">
        {flow.type === 'boleto' ? (
          <textarea
            className={cn(
              'w-full rounded-md border-2 border-system-cinza bg-transparent p-2 text-2xl font-medium shadow-none'
            )}
            maxLength={flow.type === 'boleto' ? 51 : 2000}
            style={{ resize: 'none' }}
            rows={5}
            value={flow.textValue}
            onChange={handleTextChange}
          />
        ) : (
          <Input
            type="text"
            value={flow.textValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFlow((prev) => ({ ...prev, textValue: e.target.value }))
            }
            placeholder="Insira o Pix copiado"
            className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
          />
        )}
      </div>
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
