import { IconAlert } from '@/components/icons'
import {
  ButtonNext,
  ModalDefault,
  TwoFactorAuthValidator
} from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useSendPix } from '@/services/PixApi'
import { formatedPrice, formattedDoc } from '@/utils/GenerateFormatted'
import md5 from 'md5'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

interface IPixForm {
  keyPix: string
  step: Dispatch<SetStateAction<number>>
  amount: Dispatch<SetStateAction<string>>
  name: string
  bank: string
  doc: string
}

const PixForm: React.FC<IPixForm> = ({ step, keyPix, amount, name, bank, doc }) => {
  const { user } = useAtlas()
  const [stateModalPix, setStateModalPix] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const { mutate: sendPix, isLoading, isError } = useSendPix()
  const [formSendPix, setFormSendPix] = useState<{
    amount: string
    desc: string
    save: number
  }>({ amount: '0,00', desc: '', save: 0 })

  const handleSendPix = useCallback(async () => {
    const reversePrice = Number(formSendPix.amount.replace(',', '').replace('.', ''))
    sendPix(
      {
        amount: reversePrice,
        desc: formSendPix.desc || '',
        key: keyPix,
        save: formSendPix.save,
        pwd: md5(pwdCode)
      },
      {
        onSuccess: (res) => {
          toast({
            variant: 'success',
            title: 'Seu código foi confirmado com sucesso!',
            description: res.success
          })
          amount(
            formSendPix.amount !== null ? formSendPix.amount.toString() : '0,00'
          )
          setOpenModalPwd(false)
          step(2)
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e.response?.data?.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }, [sendPix])

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <Input
          type="checkbox"
          className="w-fit"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormSendPix((prevState) => ({
              ...prevState,
              save: !e.target.checked ? 1 : 0
            }))
          }
        />
        <span className="font-medium">
          Salvar este contato para futuras transferências
        </span>
      </div>
      <div className="mb-1 flex items-center justify-start gap-2">
        <h1 className="w-[45%] font-Bills_Bold text-3xl uppercase">
          Defina o valor*:
        </h1>
        <div
          className={cn(
            'flex w-full items-center gap-1 rounded-xl border-2 border-primary-default fill-primary-default px-2 py-1 text-lg font-medium text-primary-default',
            Number(formSendPix.amount.replace(/\D/g, '')) > Number(user.amount) &&
              'border-2 border-red-600'
          )}
        >
          <label>R$</label>
          <Input
            className="border-none p-0 text-lg shadow-none"
            type="string"
            value={formSendPix.amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const format = formatedPrice(e.target.value) || ''
              setFormSendPix((prevState) => ({
                ...prevState,
                amount: format
              }))
            }}
          />
        </div>
      </div>
      {Number(formSendPix.amount.replace(/\D/g, '')) > Number(user.amount) && (
        <label className="px-4 text-right text-base font-normal text-red-500">
          Saldo insuficiente
        </label>
      )}
      <div className="flex items-center justify-start gap-2">
        <h4 className="w-[45%] text-right text-sm font-normal">
          Gostaria de adicionar alguma informação no comprovante?
        </h4>
        <textarea
          className="w-full rounded-xl border-2 border-primary-default p-2 text-base font-medium shadow-none"
          style={{ resize: 'none' }}
          rows={5}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormSendPix((prevState) => ({
              ...prevState,
              desc: e.target.value
            }))
          }
        ></textarea>
      </div>
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir para a revisão"
          disabled={Number(formSendPix.amount.replace(/[.,]/g, '')) <= 0}
          func={() => setStateModalPix(!stateModalPix)}
        />
      </div>
      <ModalDefault
        title="Para seguir, verifique e confirme as informações."
        body={
          <>
            <Separator className="bg-primary-default" />
            <div className="flex items-center justify-between gap-2">
              <IconAlert className="w-32" />
              <h4 className="text-xs">
                Antes de finalizar a operação, confirme as informações
                cuidadosamente, uma vez que o débito realizado não poderá ser
                revertido.
              </h4>
            </div>
            <Separator className="bg-primary-default" />
            <div className="text-sm font-normal">
              <div className="flex items-center gap-2">
                <label>Para:</label>
                <h4 className="text-base font-semibold">{name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>CPF/CNPJ:</label>
                <h4 className="text-base font-semibold">
                  {formattedDoc(doc, doc.length > 12 ? 'cnpj' : 'cpf')}
                </h4>
                <label>Banco:</label>
                <h4 className="text-base font-semibold">{bank}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Chave pix:</label>
                <h4 className="text-base font-semibold">{keyPix}</h4>
              </div>
              <h4 className="mb-2 mt-4 pl-[10%] text-lg font-semibold">
                R$ {formSendPix.amount}
              </h4>
              <label>Data: {new Date().toLocaleDateString()}</label>
            </div>
            <Separator className="bg-primary-default" />
          </>
        }
        openModal={stateModalPix}
        setOpenModal={setStateModalPix}
        key={'modal-pix'}
        ArrayButton={
          <>
            <Button
              className="w-full rounded-md bg-[#008000]"
              onClick={() => {
                setStateModalPix(!stateModalPix)
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
            <Separator className="bg-primary-default" />
            <TwoFactorAuthValidator
              className="text-primary-default"
              codeLength={6}
              onValidCode={(code) => setPwdCode(code)}
            />
            <Separator className="bg-primary-default" />
          </>
        }
        ArrayButton={
          <>
            <ButtonNext
              title="Enviar agora"
              disabled={pwdCode.trim() === ''}
              loading={isLoading}
              func={handleSendPix}
              classPlus="rounded-xl w-full bg-[#008000]"
            />
          </>
        }
      />
    </>
  )
}

export default PixForm
