import { IconCopyPaste, IconStar } from '@/components/icons'
import { ButtonNext, Container, Title } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { useGetKeyInfo, useListContacts } from '@/services/PixApi'
import { PixType } from '@/types/PixType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Pix: React.FC = () => {
  const { setPixCopyPaste } = useAtlas()
  const navigate = useNavigate()
  const [pixData, setPixData] = useState<PixType | null>(null)
  const { data: listMyContatcs, isLoading, isError } = useListContacts()
  const { mutate: getKeyInfo, isLoading: loadGetKeyInfo } = useGetKeyInfo()

  const [flow, setFlow] = useState<{
    step: number
    value: string
    inputPix: string
  }>({
    step: 0,
    value: '',
    inputPix: ''
  })

  const handleConsultPix = async () => {
    getKeyInfo(
      { key: flow.inputPix },
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
              value={flow.inputPix}
              onChange={(e) => setFlow({ ...flow, inputPix: e.target.value })}
              placeholder="Digite a chave pix"
              className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
            />
            <div className="flex justify-end">
              {flow.inputPix.length > 0 ? (
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
      {flow.step === 1 && (
        <>
          <div className="mb-4 flex flex-col gap-4 rounded-md border-[1px] border-system-cinza/25 p-4 text-system-cinza">
            <div className="flex items-center gap-2">
              <IconStar className="size-5 fill-transparent stroke-system-cinza" />
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
                value={flow.value}
                onChange={(e) => setFlow({ ...flow, value: e.target.value })}
                placeholder="R$ 0,00"
                className="w-full rounded-md border-[1px] border-system-cinza/25 px-4 py-6 text-base"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-base text-system-cinza">{`Observação (opcional):`}</h4>
              <textarea
                className="w-full rounded-md border-[1px] border-system-cinza/25 bg-transparent px-4 py-6 text-base"
                placeholder=""
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <ButtonNext
                title="Prosseguir"
                disabled={flow.value.length < 1}
                func={() => {}}
                loading={false}
              />
            </div>
          </div>
        </>
      )}
    </Container>
  )
}

export default Pix
