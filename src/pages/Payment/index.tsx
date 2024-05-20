import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
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
  const [typePayment, setTypePayment] = useState<string>('')
  const [textValuePayment, setTextValuePayment] = useState<string>('')
  const [stateModalPayment, setStateModalPayment] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const [dataPayment, setDataPayment] = useState<App.PaymentProps | undefined>()

  const listPaymentsActions = [
    {
      title: 'Digitar código de barras',
      icon: IconBarCode,
      func: () => setTypePayment('boleto')
    },
    {
      title: 'Pix Copia e Cola',
      icon: IconPix,
      func: () => setTypePayment('pix')
    }
  ]

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value
    if (typePayment === 'boleto') {
      value = formatLineDigit(value)
    }
    setTextValuePayment(value)
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
      number: '123',
      type: typePayment
    })
      .then((res) => {
        setDataPayment(res)
        setStateModalPayment(true)
      })
      .catch((e: Error) => {
        console.error(e)
      })
  }

  const handleSendPayment = async () => {
    await PaymentApi.sendPayment({
      number: textValuePayment,
      type: typePayment,
      pwd: md5(pwdCode)
    })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Pagamento feito com sucesso!',
          description: res.success
        })
        setTypePayment('success')
        setOpenModalPwd(false)
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
        back={() => (typePayment.length <= 0 ? navigate(-1) : setTypePayment(''))}
      />
      {typePayment.length <= 0 && (
        <>
          <h4 className="text-base font-medium">Escolha como pagar</h4>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentsActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
        </>
      )}
      {typePayment.length >= 1 && typePayment !== 'success' && (
        <>
          <h4 className="text-base font-medium">
            {typePayment === 'boleto' ? 'Digite o código de barras' : 'Cole o Pix'}
          </h4>
          <div className="flex flex-col gap-2 p-2">
            <textarea
              className="w-full rounded-xl border-2 border-colorPrimary-500 p-2 text-3xl font-medium shadow-none"
              style={{ resize: 'none' }}
              maxLength={51}
              rows={5}
              value={textValuePayment}
              onChange={handleTextChange}
            />
          </div>
          <div className="mt-1 flex justify-end">
            <Button
              className="w-6/12 p-2 text-base"
              disabled={
                typePayment === 'boleto'
                  ? textValuePayment.length <= 50
                  : textValuePayment.length <= 1
              }
              onClick={handleConsultPayment}
            >
              Prosseguir
            </Button>
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
                      {typePayment === 'boleto'
                        ? 'Código de barras: '
                        : 'Código do Pix'}
                    </label>
                    <h4 className="text-xl font-bold">{textValuePayment}</h4>
                  </div>
                  {typePayment === 'boleto' ? (
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
                  onValidCode={(code) => setPwdCode(code)}
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
      {typePayment === 'success' && (
        <PaymentSuccess
          amount={dataPayment?.price.toString() || ''}
          name={dataPayment?.owner.toString() || ''}
          doc={dataPayment?.document || ''}
          barcode={dataPayment?.barcode || ''}
          time={''}
        />
      )}
    </AdminContainer>
  )
}

export default Payments
