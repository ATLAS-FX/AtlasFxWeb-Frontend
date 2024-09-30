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
import { useTransferApi } from '@/services/TransferApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { formattedDoc, formattedPrice } from '@/utils/GenerateFormatted'
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

interface TransferStepProps {
  step: {
    step: number
    bank: string
    agency: string
    account: string
    amount: string
    typeAccount: string
    name: string
    docType: string
    doc: string
    desc: string
  }
  setStep: Dispatch<
    SetStateAction<{
      step: number
      bank: string
      agency: string
      account: string
      amount: string
      typeAccount: string
      name: string
      docType: string
      doc: string
      desc: string
    }>
  >
}

const TransferStep: React.FC<TransferStepProps> = ({ step, setStep }) => {
  const { user } = useAtlas()
  const [stateModalPix, setStateModalPix] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const { mutate: SendApi, isLoading, isError } = useTransferApi()

  const handleSendTED = async () => {
    SendApi(
      {
        account: step.account,
        account_type: step.typeAccount,
        agency: step.agency,
        amount: step.amount,
        bank: step.bank,
        category: 'TED',
        desc: step.desc,
        doc: step.doc,
        doc_type: step.docType,
        name: step.name
      },
      {
        onSuccess: (res: any) => {
          console.log(res)
          setOpenModalPwd(false)
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

  useEffect(() => {
    console.log(Number(step.amount.replace(/\D/g, '')), Number(user.amount))
  }, [step])

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
            setStep((prevState) => ({
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
            'text-primary-default" flex w-full items-center gap-1 rounded-xl border-2 border-primary-default fill-primary-default px-2 py-1 text-lg font-medium',
            Number(step.amount.replace(/\D/g, '')) > Number(user.amount) &&
              'border-2 border-red-600'
          )}
        >
          <label>R$</label>
          <Input
            className="border-none p-0 text-lg shadow-none"
            type="string"
            value={step.amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const format = formattedPrice(e.target.value) || ''
              setStep((prevState) => ({
                ...prevState,
                amount: format
              }))
            }}
          />
        </div>
      </div>
      {Number(step.amount.replace(/\D/g, '')) > Number(user.amount) && (
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
            setStep((prevState) => ({
              ...prevState,
              desc: e.target.value
            }))
          }
        ></textarea>
      </div>
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir para a revisão"
          disabled={Number(step.amount.replace(/[.,]/g, '')) <= 0}
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
              <label className="text-lg font-medium">Para</label>
              <div className="flex items-center gap-2">
                <label>Nome:</label>
                <h4 className="text-base font-semibold">{step.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label className="uppercase">{step.doc}</label>
                <h4 className="text-base font-semibold">
                  {formattedDoc(step.doc, step.docType)}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Banco:</label>
                <h4 className="text-base font-semibold">{step.bank}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Tipo de conta:</label>
                <h4 className="text-base font-semibold capitalize">
                  {step.typeAccount}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Ag:</label>
                <h4 className="text-base font-semibold">{step.agency}</h4>
                <label>Conta:</label>
                <h4 className="text-base font-semibold">{step.account}</h4>
              </div>
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
              func={handleSendTED}
              classPlus="rounded-xl w-full bg-[#008000]"
            />
          </>
        }
      />
    </>
  )
}

export default TransferStep
