import { IconStar } from '@/components/icons'
import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useTransferApi } from '@/services/TransferApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ModalTransfer from './ModalTransfer'
import { SendPixType } from '@/types/PixType'

interface CheckPageTransferProps {
  flow: {
    step: number
    save: number
    pwd: string
    bank: string
    agency: string
    account: string
    amount: string
    typeAccount: string
    name: string
    docType: string
    doc: string
    desc: string
    modalTransfer: boolean
  }
  setFlow: Dispatch<
    SetStateAction<{
      step: number
      save: number
      pwd: string
      bank: string
      agency: string
      account: string
      amount: string
      typeAccount: string
      name: string
      docType: string
      doc: string
      desc: string
      modalTransfer: boolean
    }>
  >
  sendTransfer: SendPixType | undefined
  setSendTransfer: Dispatch<SetStateAction<SendPixType | undefined>>
}

const CheckPageTransfer: React.FC<CheckPageTransferProps> = ({
  flow,
  setFlow,
  sendTransfer,
  setSendTransfer
}) => {
  const { mutate: transfer, isLoading } = useTransferApi()

  const handleTransfer = async () => {
    transfer(
      {
        amount: Number(flow.amount.replace(',', '').replace('.', '')),
        desc: flow.desc || '',
        account: flow.account,
        account_type: flow.typeAccount,
        agency: flow.agency,
        bank: flow.bank,
        doc: flow.doc,
        category: 'TED',
        name: flow.name,
        doc_type: flow.docType
      },
      {
        onSuccess: (res) => {
          setSendTransfer(res)
          setFlow({ ...flow, step: 4 })
          toast({
            variant: 'success',
            title: 'Seu código foi confirmado com sucesso!',
            description: res.success
          })
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
      <article className="relative flex flex-col gap-4 rounded-xl border-[1px] border-system-cinza/25 p-4 text-system-cinza">
        <Button
          className="absolute right-2 top-2 flex h-fit w-fit items-center gap-2 border-[1px] border-primary-hover bg-transparent p-2 text-xs text-primary-hover shadow-none transition-all duration-300 ease-in-out hover:fill-white hover:text-white"
          onClick={() => setFlow({ ...flow, save: flow.save === 0 ? 1 : 0 })}
        >
          {flow?.save === 0 ? 'Salvar Contato' : 'Não Salvar'}
        </Button>
        <div className="flex items-center gap-2">
          <IconStar
            className={cn(
              'size-5 fill-transparent stroke-system-cinza',
              flow.save === 1 && 'fill-primary-default stroke-primary-default'
            )}
          />
          <h4 className="font-semibold text-primary-default">Destinatário</h4>
        </div>
        <div className="flex flex-col gap-2 pl-7">
          <div className="flex items-center gap-2">
            <h4 className="text-base text-system-cinza">Nome:</h4>
            <p className="text-base text-primary-default">
              {flow?.name || 'Não informado'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-base text-system-cinza">CNPJ/CPF:</h4>
            <p className="text-base text-primary-default">{flow?.doc}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-base text-system-cinza">Banco:</h4>
            <p className="text-base text-primary-default">{flow?.bank}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-base text-system-cinza">Agência:</h4>
            <p className="text-base text-primary-default">{flow?.agency}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-base text-system-cinza">Conta:</h4>
            <p className="text-base text-primary-default">{flow?.account}</p>
          </div>
        </div>
      </article>
      <aside className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-base text-system-cinza">Insira o valor:</h4>
          <Input
            type="text"
            value={flow.amount.length >= 1 ? `R$ ${flow.amount}` : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const format = formattedPrice(e.target.value) || ''
              setFlow({
                ...flow,
                amount: format
              })
            }}
            placeholder="R$ 0,00"
            className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-base text-system-cinza">{`Observação (opcional):`}</h4>
          <textarea
            className="w-full rounded-md border-[1px] border-system-cinza/25 bg-transparent p-4 text-base"
            placeholder=""
            rows={3}
            value={flow.desc}
            onChange={(e) => setFlow({ ...flow, desc: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <ButtonNext
            title="Prosseguir"
            disabled={flow.amount.length < 1}
            func={() => setFlow({ ...flow, step: 2, modalTransfer: true })}
          />
        </div>
      </aside>
      <ModalTransfer
        key={'modaltransfer'}
        state={flow}
        setState={setFlow}
        sendTransfer={sendTransfer}
        transferFunc={handleTransfer}
        loadTransfer={isLoading}
      />
    </>
  )
}

export default CheckPageTransfer
