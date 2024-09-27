import { IconCopyPaste, IconStar } from '@/components/icons'
import { ButtonNext, Container, Title } from '@/components/layout'
import { Selects } from '@/components/layout/Select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useGetKeyInfo, useListContacts, useSendPix } from '@/services/PixApi'
import { PixType } from '@/types/PixType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalPix from './ModalPix'

const Pix: React.FC = () => {
  const { setPixCopyPaste } = useAtlas()
  const navigate = useNavigate()
  const [pixData, setPixData] = useState<PixType | null>(null)
  const { data: listMyContatcs, isLoading, isError } = useListContacts()
  const { mutate: getKeyInfo, isLoading: loadGetKeyInfo } = useGetKeyInfo()
  const { mutate: sendPix, isLoading: loadSendPix } = useSendPix()

  const [flow, setFlow] = useState<{
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
      { key: flow.keyPix },
      {
        onSuccess: (res: PixType) => {
          setPixData(res)
          setFlow({ ...flow, step: 1 })
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e?.message || '',
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
        pwd: flow.pwd
      },
      {
        onSuccess: (res) => {
          setFlow({ ...flow, step: 3 })
          toast({
            variant: 'success',
            title: 'Seu código foi confirmado com sucesso!',
            description: res.success
          })
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e?.message || '',
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError, listMyContatcs])

  return (
    <Container>
      <Title
        title="Área Pix"
        subtitle="Envie seus PIX. Simples e rápido."
        back={() => navigate(-1)}
      />
      {flow.step === 0 && (
        <>
          <div className="flex flex-col gap-4">
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
          </div>
          <Selects
            classTrigger="rounded-md border-[1px] border-system-cinza/25 px-2 text-base shadow-sm data-[placeholder]:text-slate-400 bg-transparent"
            place={'Minhas Chaves'}
            items={[
              {
                text: 'Chave 1',
                value: '1'
              },
              {
                text: 'Chave 2',
                value: '2'
              },
              {
                text: 'Chave 3',
                value: '3'
              }
            ]}
            value={flow.keyPix}
            setValue={() => setFlow({ ...flow, keyPix: '' })}
          />
          <Separator className="my-4 h-0.5 w-full bg-system-cinza/25" />
          {isLoading ? (
            <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
          ) : (
            <>
              {(listMyContatcs ?? []).length < 1 ? (
                <h4 className="flex items-center gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
                  Sem Contatos
                </h4>
              ) : (
                <h4 className="flex items-center gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
                  <IconStar className="size-5 fill-transparent stroke-system-cinza" />
                  Contatos
                </h4>
              )}
            </>
          )}
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
                value={flow.amount}
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
                func={() => setFlow({ ...flow, stateModal: true })}
              />
            </div>
          </div>
        </>
      )}
      <ModalPix
        state={flow}
        setState={setFlow}
        data={pixData}
        SendPixFunc={handleSendPix}
        loadPix={loadSendPix}
      />
    </Container>
  )
}

export default Pix
