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
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalPix from './ModalPix'

interface FlowPagePixProps {}

const FlowPagePix: React.FC<FlowPagePixProps> = () => {
  const navigate = useNavigate()
  const { setPixCopyPaste } = useAtlas()
  const { mutate: getKeyInfo, isLoading: loadGetKeyInfo } = useGetKeyInfo()
  const { mutate: sendPix, isLoading: loadSendPix } = useSendPix()
  const [pixData, setPixData] = useState<PixType | null>(null)
  const [stateFlow, setStateFlow] = useState<{
    step: number
    keyPix: string
    amount: string
    desc: string
    save: number
    pwd: string
    stateModal: boolean
  }>({
    step: 0,
    keyPix: '',
    amount: '',
    desc: '',
    save: 0,
    pwd: '',
    stateModal: false
  })

  const handleConsultPix = async () => {
    getKeyInfo(
      { key: stateFlow.keyPix },
      {
        onSuccess: (res: PixType) => {
          setPixData(res)
          setStateFlow({ ...stateFlow, step: 1 })
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
        amount: Number(stateFlow.amount.replace(',', '').replace('.', '')),
        desc: stateFlow.desc || '',
        key: stateFlow.keyPix,
        save: stateFlow.save,
        pwd: md5(stateFlow.pwd)
      },
      {
        onSuccess: (res) => {
          setStateFlow({ ...stateFlow, step: 3 })
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
      {stateFlow.step >= 0 && (
        <>
          <h4 className="text-sm text-system-cinza">Insira a chave pix:</h4>
          <Input
            type="text"
            value={stateFlow.keyPix}
            onChange={(e) => setStateFlow({ ...stateFlow, keyPix: e.target.value })}
            placeholder="Digite a chave pix"
            className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
          />
          <div className="flex justify-end">
            {stateFlow.keyPix.length > 0 ? (
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
      {stateFlow.step >= 1 && (
        <>
          <div className="relative flex flex-col gap-4 rounded-xl border-[1px] border-system-cinza/25 p-4 text-system-cinza">
            <Button
              className="absolute right-2 top-2 flex h-fit w-fit items-center gap-2 border-[1px] border-primary-hover bg-transparent p-2 text-xs text-primary-hover shadow-none transition-all duration-300 ease-in-out hover:fill-white hover:text-white"
              onClick={() =>
                setStateFlow({ ...stateFlow, save: stateFlow.save === 0 ? 1 : 0 })
              }
            >
              {stateFlow?.save === 0 ? 'Salvar Contato' : 'Não Salvar'}
            </Button>
            <div className="flex items-center gap-2">
              <IconStar
                className={cn(
                  'size-5 fill-transparent stroke-system-cinza',
                  stateFlow.save === 1 &&
                    'fill-primary-default stroke-primary-default'
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
                value={stateFlow.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const format = formattedPrice(e.target.value) || ''
                  setStateFlow({
                    ...stateFlow,
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
                value={stateFlow.desc}
                onChange={(e) =>
                  setStateFlow({ ...stateFlow, desc: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <ButtonNext
                title="Prosseguir"
                disabled={stateFlow.amount.length < 1}
                func={() => setStateFlow({ ...stateFlow, stateModal: true })}
              />
            </div>
          </div>
        </>
      )}
      <ModalPix
        key={'modalpix'}
        state={stateFlow}
        setState={setStateFlow}
        data={pixData}
        SendPixFunc={handleSendPix}
        loadPix={loadSendPix}
      />
    </article>
  )
}

export default FlowPagePix
