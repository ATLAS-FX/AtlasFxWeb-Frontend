import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { IconAlert } from '@/components/icons/Alert'
import { IconBarCode } from '@/components/icons/BarCode'
import { IconPix } from '@/components/icons/Pix'
import { AdminContainer } from '@/components/layout/Container'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Title } from '@/components/layout/Text/Title'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import PaymentApi from '@/services/PaymentApi'
import { formatDoc } from '@/utils/formatDoc'
import { Separator } from '@radix-ui/react-separator'
import md5 from 'md5'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [stateModalPayment, setStateModalPayment] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [dataPayment, setDataPayment] = useState<App.PaymentProps | undefined>()

  const listPaymentsActions = [
    {
      title: 'Digitar código de barras',
      icon: IconBarCode,
      func: () => {
        setStepPayment((prev) => ({ ...prev, typePayment: 'boleto', step: 1 }))
      }
    },
    {
      title: 'Pix Copia e Cola',
      icon: IconPix,
      func: () => {
        setStepPayment((prev) => ({ ...prev, typePayment: 'pix', step: 1 }))
      }
    }
  ]

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value
    if (stepPayment.type === 'boleto') {
      value = formatLineDigit(value)
    }
    setStepPayment((prev) => ({ ...prev, textValuePayment: value }))
  }

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

  const handleConsultPayment = async () => {
    await PaymentApi.consultPayment({
      number: stepPayment.textValue,
      type: stepPayment.type
    })
      .then((res) => {
        setDataPayment(res)
        setStepPayment((prev) => ({ ...prev, stateModalPayment: true }))
      })
      .catch((e: Error) => {
        console.error(e)
      })
  }

  const handleSendPayment = async () => {
    await PaymentApi.sendPayment({
      number: stepPayment.textValue,
      type: stepPayment.type,
      pwd: md5(stepPayment.pwdCode)
    })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Pagamento feito com sucesso!',
          description: res.success
        })
        setStepPayment((prev) => ({ ...prev, step: 3, openModalPwd: false }))
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao efetuar pagamento.',
          description: e.message
        })
      })
  }

  return (
    <AdminContainer>
      <Title
        text="Pagamentos"
        back={() =>
          stepPayment.step <= 0
            ? navigate(-1)
            : setStepPayment((prev) => ({ ...prev, step: prev.step - 1 }))
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
        <>
          <h4 className="text-base font-medium">
            {stepPayment.type === 'boleto'
              ? 'Digite o código de barras'
              : 'Cole o Pix'}
          </h4>
          <div className="flex flex-col gap-2 p-2">
            <textarea
              className="w-full rounded-xl border-2 border-colorPrimary-500 p-2 text-3xl font-medium shadow-none"
              style={{ resize: 'none' }}
              maxLength={51}
              rows={5}
              value={stepPayment.textValue}
              onChange={handleTextChange}
            />
          </div>
          <ButtonNext
            title="Prosseguir"
            disabled={
              stepPayment.type === 'boleto'
                ? stepPayment.textValue.length <= 50
                : stepPayment.textValue.length <= 1
            }
            func={handleConsultPayment}
          />
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
                      {stepPayment.type === 'boleto'
                        ? 'Código de barras: '
                        : 'Código do Pix'}
                    </label>
                    <h4 className="text-xl font-bold">{stepPayment.textValue}</h4>
                  </div>
                  {stepPayment.type === 'boleto' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <label>Data de Vencimento:</label>
                        <h4 className="text-base font-semibold">
                          {new Date(
                            dataPayment?.expired_date || ''
                          ).toLocaleDateString()}
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
                        <h4 className="text-base font-semibold">
                          R$ {dataPayment?.price}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Descontos:</label>
                        <h4 className="text-base font-semibold">
                          {dataPayment?.fee}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Encargos:</label>
                        <h4 className="text-base font-semibold">
                          {dataPayment?.charges}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <label>Valor total a receber:</label>
                        <h4 className="text-base font-semibold">
                          R$ {dataPayment?.receviePrice}
                        </h4>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="flex items-center gap-2">
                    <label>Nome do Beneficiário:</label>
                    <h4 className="text-base font-semibold">{dataPayment?.owner}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Documento:</label>
                    <h4 className="text-base font-semibold">
                      {formatDoc(dataPayment?.document || '', 'cnpj')}
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
                <Button
                  className="w-full rounded-md bg-[#C8D753] text-base font-bold text-colorPrimary-500 hover:bg-colorPrimary-500 hover:text-colorSecondary-500"
                  onClick={() => {
                    setStateModalPayment(!stateModalPayment)
                    setOpenModalPwd(!openModalPwd)
                  }}
                >
                  Prosseguir para a senha
                </Button>
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
                    setStepPayment((prev) => ({
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
                <Button
                  className="w-full rounded-md bg-[#008000]"
                  onClick={handleSendPayment}
                >
                  Enviar agora
                </Button>
              </>
            }
          />
        </>
      )}
      {stepPayment.step === 3 && (
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
