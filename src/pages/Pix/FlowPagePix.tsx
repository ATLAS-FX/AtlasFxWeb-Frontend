import { IconCopyPaste, IconStar } from '@/components/icons'
import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useGetKeyInfo, useSendPix } from '@/services/PixApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { PixType } from '@/types/PixType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import md5 from 'md5'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalPix from './ModalPix'

interface FlowPagePixProps {
  flow: {
    step: number
    select: string
    desc: string
    keyPix: string
    save: number
    amount: string
    pwd: string
    modalPix: boolean
    modalKey: boolean
  }

  setFlow: Dispatch<
    SetStateAction<{
      step: number
      select: string
      desc: string
      keyPix: string
      save: number
      amount: string
      pwd: string
      modalPix: boolean
      modalKey: boolean
    }>
  >
}

const FlowPagePix: React.FC<FlowPagePixProps> = ({ flow, setFlow }) => {
  const navigate = useNavigate()
  const { setPixCopyPaste } = useAtlas()
  const { mutate: getKeyInfo, isLoading: loadGetKeyInfo } = useGetKeyInfo()
  const { mutate: sendPix, isLoading: loadSendPix } = useSendPix()
  const [pixData, setPixData] = useState<PixType | null>(null)
  const handleConsultPix = async () => {
    getKeyInfo(
      { key: flow.keyPix },
      {
        onSuccess: (res: PixType) => {
          setPixData(res)
          setFlow({ ...flow, step: 1, select: 'flowPage' })
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

  const handleSendPix = async () => {
    sendPix(
      {
        amount: Number(flow.amount.replace(',', '').replace('.', '')),
        desc: flow.desc || '',
        key: flow.keyPix,
        save: flow.save,
        pwd: md5(flow.pwd)
      },
      {
        onSuccess: (res) => {
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
    <article className="flex flex-col gap-4">
      {flow.step === 0 && (
        <>
          <h4 className="text-sm text-system-cinza">Insira a chave pix:</h4>
          <Input
            type="text"
            value={flow.keyPix}
            onChange={(e) => setFlow({ ...flow, keyPix: e.target.value })}
            placeholder="Digite a chave pix"
            className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
          />
          <div className="flex justify-end">
            {flow.keyPix.length > 0 ? (
              <ButtonNext
                title="Prosseguir"
                func={handleConsultPix}
                loading={loadGetKeyInfo}
              />
            ) : (
              <Button
                className="flex items-center gap-2 bg-primary-default fill-system-neutro px-4 py-6 text-system-neutro"
                onClick={() => {
                  setPixCopyPaste(true)
                  navigate('/payments')
                }}
              >
                <IconCopyPaste className="size-5" />
                Copia e cola
              </Button>
            )}
          </div>
        </>
      )}
      {flow.step >= 1 && (
        <>
          <div className="relative flex flex-col gap-4 rounded-xl border-[1px] border-system-cinza/25 p-4 text-system-cinza">
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
                  {pixData?.name || 'Não informado'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-base text-system-cinza">CNPJ/CPF:</h4>
                <p className="text-base text-primary-default">{pixData?.doc}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-base text-system-cinza">Banco:</h4>
                <p className="text-base text-primary-default">{pixData?.bank}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-base text-system-cinza">Agência:</h4>
                <p className="text-base text-primary-default">{pixData?.agency}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-base text-system-cinza">Conta:</h4>
                <p className="text-base text-primary-default">{pixData?.account}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
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
                func={() => setFlow({ ...flow, step: 2, modalPix: true })}
              />
            </div>
          </div>
        </>
      )}
      <ModalPix
        key={'modalpix'}
        state={flow}
        setState={setFlow}
        data={pixData}
        SendPixFunc={handleSendPix}
        loadPix={loadSendPix}
      />
    </article>
  )
}

export default FlowPagePix
