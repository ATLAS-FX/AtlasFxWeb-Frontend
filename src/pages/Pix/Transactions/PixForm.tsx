import { IconAlert } from '@/components/icons/Alert'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { formatDoc } from '@/utils/formatDoc'
import { formatedPrice } from '@/utils/formatedPrice'
import md5 from 'md5'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface IPixForm {
  keyPix: string
  step: Dispatch<SetStateAction<number>>
  amount: Dispatch<SetStateAction<string>>
  name: string
  bank: string
  doc: string
}

const PixForm: React.FC<IPixForm> = ({ step, keyPix, amount, name, bank, doc }) => {
  const [stateModalPix, setStateModalPix] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const [formSendPix, setFormSendPix] = useState<{
    amount: string
    desc: string
    save: number
  }>({ amount: '', desc: '', save: 0 })

  const isFormValid = Object.values(formSendPix.amount).every(
    (value) => value.trim() !== ''
  )

  const handleSendPix = async () => {
    await PixApi.sendPix({
      amount: Number(formSendPix.amount) || 0,
      desc: formSendPix.desc || '',
      key: keyPix,
      save: formSendPix.save,
      pwd: md5(pwdCode)
    })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu código foi confirmado com sucesso!',
          description: res.success
        })
        amount(formSendPix.amount !== null ? formSendPix.amount.toString() : '')
        setOpenModalPwd(false)
        step(2)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao confirmar código para alteração endereço',
          description: e.message
        })
      })
    console.log(pwdCode)
  }

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
        <div className='text-colorPrimary-500" flex w-full items-center gap-1 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-lg font-medium'>
          <label>R$</label>
          <Input
            className="border-none p-0 text-lg shadow-none"
            type="string"
            value={formSendPix.amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const format = formatedPrice(e.target.value) || ''
              console.log(format)
              setFormSendPix((prevState) => ({
                ...prevState,
                amount: format
              }))
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <h4 className="w-[45%] text-right text-sm font-normal">
          Gostaria de adicionar alguma informação no comprovante?
        </h4>
        <textarea
          className="w-full rounded-xl border-2 border-colorPrimary-500 p-2 text-base font-medium shadow-none"
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
        <Button
          className="w-6/12 p-2 text-base"
          disabled={!isFormValid}
          onClick={() => setStateModalPix(!stateModalPix)}
        >
          Prosseguir para a revisão
        </Button>
      </div>
      <ModalDefault
        title="Para seguir, verifique e confirme as informações."
        body={
          <>
            <Separator className="bg-colorPrimary-500" />
            <div className="flex items-center justify-between gap-2">
              <IconAlert className="w-32" />
              <h4 className="text-xs">
                Antes de finalizar a operação, confirme as informações
                cuidadosamente, uma vez que o débito realizado não poderá ser
                revertido.
              </h4>
            </div>
            <Separator className="bg-colorPrimary-500" />
            <div className="text-sm font-normal">
              <div className="flex items-center gap-2">
                <label>Para:</label>
                <h4 className="text-base font-semibold">{name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>CPF/CNPJ:</label>
                <h4 className="text-base font-semibold">
                  {formatDoc(doc, doc.length > 12 ? 'cnpj' : 'cpf')}
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
            <Separator className="bg-colorPrimary-500" />
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
              onClick={handleSendPix}
            >
              Enviar agora
            </Button>
          </>
        }
      />
    </>
  )
}

export default PixForm
