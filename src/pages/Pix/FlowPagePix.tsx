import { IconCopyPaste, IconStar } from '@/components/icons'
import { ButtonNext, InputFx, TextAreaFX } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useGetKeyInfo, useSendPix } from '@/services/PixApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { PixType, SendPixType } from '@/types/PixType'
import { PixStateType } from '@/types/StatesType'
import { formatKeyPix } from '@/utils/FormattedKeyPix'
import { formattedPrice } from '@/utils/GenerateFormatted'
import md5 from 'md5'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalPix from './ModalPix'

interface FlowPagePixProps {
  flow: PixStateType
  setFlow: Dispatch<SetStateAction<PixStateType>>
  sendData: SendPixType | undefined
  setSendData: Dispatch<SetStateAction<SendPixType | undefined>>
}

const FlowPagePix: React.FC<FlowPagePixProps> = ({
  flow,
  setFlow,
  sendData,
  setSendData
}) => {
  const navigate = useNavigate()
  const { setControlAtlas } = useAtlas()
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
          setSendData(res)
          setControlAtlas((prev) => ({ ...prev, refetchBalance: true }))
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

  useEffect(() => {
    console.log('flow', flow)
  }, [flow])

  return (
    <article className="flex flex-col gap-4">
      {flow.step === 0 && (
        <>
          <InputFx
            name={'flowpix'}
            label={'Digite a chave pix'}
            value={flow.formatKeyPix}
            change={(e) => {
              const { formattedKey, type } = formatKeyPix(e)
              console.log(type)
              setFlow({
                ...flow,
                keyPix:
                  type === 'phone'
                    ? `+55${e.replace(/[^\d]/g, '')}`
                    : type === 'cpf' || type === 'cnpj'
                      ? e.replace(/[^\d]/g, '')
                      : e,
                formatKeyPix: formattedKey,
                typekeyPix: type
              })
            }}
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
                className="focus:bg-primary-default/25 flex items-center gap-2 bg-primary-default fill-system-neutro p-2 text-sm text-system-neutro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800"
                onClick={() => {
                  setControlAtlas((prev) => ({ ...prev, pixCopyPaste: true }))
                  navigate('/payments')
                }}
              >
                <IconCopyPaste className="size-4" />
                Copia e cola
              </Button>
            )}
          </div>
        </>
      )}
      {flow.step >= 1 && (
        <>
          <article className="relative flex flex-col gap-4 rounded-xl border-2 border-system-cinza/25 p-4 text-system-cinza">
            <Button
              className="absolute right-2 top-2 flex h-fit w-fit items-center gap-2 border-[1px] border-primary-hover bg-transparent p-2 text-xs text-primary-hover shadow-none transition-all duration-300 ease-in-out hover:fill-white hover:text-white focus:ring-2 focus:ring-system-cinza/50 focus-visible:outline-none"
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
          </article>
          <aside className="mt-4 flex flex-col gap-6">
            <InputFx
              name={'value-pix'}
              label={'Insira o valor'}
              value={flow.amount.length >= 1 ? `R$ ${flow.amount}` : ''}
              change={(e) => {
                const format = formattedPrice(e) || ''
                setFlow({
                  ...flow,
                  amount: format
                })
              }}
            />
            <TextAreaFX
              name={'text-pix'}
              label={'Observação (opcional)'}
              value={flow.desc}
              change={(e) => setFlow({ ...flow, desc: e })}
            />
            <div className="flex justify-end">
              <ButtonNext
                title="Prosseguir"
                disabled={flow.amount.length < 1}
                func={() => setFlow({ ...flow, step: 2, modalPix: true })}
              />
            </div>
          </aside>
        </>
      )}
      <ModalPix
        key={'modalpix'}
        state={flow}
        setState={setFlow}
        data={pixData}
        dataSendPix={sendData}
        SendPixFunc={handleSendPix}
        loadPix={loadSendPix}
      />
    </article>
  )
}

export default FlowPagePix
