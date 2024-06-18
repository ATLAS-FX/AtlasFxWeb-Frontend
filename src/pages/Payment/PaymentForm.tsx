import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { IconAlert } from '@/components/icons/Alert'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import PaymentApi from '@/services/PaymentApi'
import { formattedDoc } from '@/utils/FormattedDoc'
import md5 from 'md5'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface IPaymentForm {
  flow: {
    step: number
    type: string
    textValue: string
    pwdCode: string
    loading: boolean
  }
  setFlow: Dispatch<
    SetStateAction<{
      step: number
      type: string
      textValue: string
      pwdCode: string
      loading: boolean
    }>
  >
  data: App.PaymentProps | undefined
  setData: Dispatch<SetStateAction<App.PaymentProps | undefined>>
}

const PaymentForm: React.FC<IPaymentForm> = ({ flow, setFlow, data, setData }) => {
  const [stateModalPayment, setStateModalPayment] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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
    await PaymentApi.consultPayment({
      number: flow.textValue,
      type: flow.type
    })
      .then((res) => {
        setData(res)
        setStateModalPayment(true)
      })
      .catch((e: Error) => {
        console.error(e)
      })
  }

  const handleSendPayment = async () => {
    setLoading(true)
    await PaymentApi.sendPayment({
      number: flow.textValue,
      type: flow.type,
      pwd: md5(flow.pwdCode)
    })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Pagamento feito com sucesso!',
          description: res.success
        })
        setFlow((prev) => ({ ...prev, step: 2, openModalPwd: false }))
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao efetuar pagamento.',
          description: e.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <h4 className="text-base font-medium">
        {flow.type === 'boleto' ? 'Digite o código de barras' : 'Cole o Pix'}
      </h4>
      <div className="flex flex-col gap-2 p-2">
        <textarea
          className="w-full rounded-xl border-2 border-colorPrimary-500 p-2 text-3xl font-medium shadow-none"
          style={{ resize: 'none' }}
          maxLength={51}
          rows={5}
          value={flow.textValue}
          onChange={handleTextChange}
        />
      </div>
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir"
          disabled={
            flow.type === 'boleto'
              ? flow.textValue.length <= 50
              : flow.textValue.length <= 1
          }
          func={handleConsultPayment}
        />
      </div>
      <ModalDefault
        title="Para seguir, verifique e confirme as informações."
        body={
          <>
            <Separator className="h-[2px] bg-colorPrimary-500" />
            <div className="flex items-center justify-between gap-2">
              <IconAlert className="w-56" />
              <h4 className="text-sm font-medium">
                Antes de finalizar a operação, confirme as informações
                cuidadosamente, uma vez que o débito realizado não poderá ser
                revertido.
              </h4>
            </div>
            <Separator className="h-[2px] bg-colorPrimary-500" />
            <div className="flex flex-col gap-2 text-sm font-normal text-colorPrimary-500">
              <div className="flex flex-col gap-1">
                <label>
                  {flow.type === 'boleto' ? 'Código de barras: ' : 'Código do Pix'}
                </label>
                <h4 className="text-xl font-bold">{flow.textValue}</h4>
              </div>
              {flow.type === 'boleto' ? (
                <>
                  <div className="flex items-center gap-2">
                    <label>Data de Vencimento:</label>
                    <h4 className="text-base font-semibold">
                      {new Date(data?.expired_date || '').toLocaleDateString()}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Data de Pagamento:</label>
                    <h4 className="text-base font-semibold">
                      {new Date().toLocaleDateString()}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Valor nominal:</label>
                    <h4 className="text-base font-semibold">R$ {data?.price}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Descontos:</label>
                    <h4 className="text-base font-semibold">{data?.fee}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Encargos:</label>
                    <h4 className="text-base font-semibold">{data?.charges}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Valor total a receber:</label>
                    <h4 className="text-base font-semibold">
                      R$ {data?.receviePrice}
                    </h4>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="flex items-center gap-2">
                <label>Nome do Beneficiário:</label>
                <h4 className="text-base font-semibold">{data?.owner}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Documento:</label>
                <h4 className="text-base font-semibold">
                  {formattedDoc(data?.document || '', 'cnpj')}
                </h4>
              </div>
            </div>
            <Separator className="bg-colorPrimary-500" />
          </>
        }
        openModal={stateModalPayment}
        setOpenModal={setStateModalPayment}
        key={'modal-pix'}
        ArrayButton={
          <>
            <ButtonNext
              title="Prosseguir para a senha"
              func={() => {
                setStateModalPayment(!stateModalPayment)
                setOpenModalPwd(!openModalPwd)
              }}
              classPlus="w-full rounded-xl bg-[#C8D753] text-base font-bold text-colorPrimary-500 hover:bg-colorPrimary-500 hover:text-colorSecondary-500"
            />
          </>
        }
      />
      <ModalDefault
        openModal={openModalPwd}
        setOpenModal={setOpenModalPwd}
        body={
          <>
            <h4 className="text-sm font-semibold">
              Para seguir, insira sua senha de 6 dígitos.
            </h4>
            <Separator className="bg-colorPrimary-500" />
            <TwoFactorAuthValidator
              className="text-colorPrimary-500"
              codeLength={6}
              onValidCode={(code) =>
                setFlow((prev) => ({
                  ...prev,
                  pwdCode: code
                }))
              }
            />
            <Separator className="bg-colorPrimary-500" />
          </>
        }
        ArrayButton={
          <>
            <ButtonNext
              title="Enviar agora"
              func={handleSendPayment}
              disabled={flow.pwdCode.length === 6}
              loading={!loading}
              classPlus="rounded-xl w-full bg-[#008000]"
            />
          </>
        }
      />
    </>
  )
}

export default PaymentForm
