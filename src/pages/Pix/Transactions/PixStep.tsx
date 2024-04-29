import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import PixApi from '@/services/PixApi'
import { formatDoc } from '@/utils/formatDoc'
import { CheckCircle2 } from 'lucide-react'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PixForm from './PixForm'
import PixSuccess from './PixSuccess'

const PixStep: React.FC = () => {
  const navigate = useNavigate()
  const [stepPix, setStepPix] = useState<number>(0)
  const [getKeyInput, setGetKeyInput] = useState<string>('')
  const [getAmountForm, setGetAmountForm] = useState<string>('')
  const [data, setData] = useState<App.PixProps>({
    bank: '',
    doc: '',
    key: '',
    name: ''
  })

  const CheckKeyInputPix = useCallback(async () => {
    await PixApi.getKeyInfo({ key: getKeyInput })
      .then((res) => {
        setData(res)
        setStepPix(1)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao gerar código de alteração de endereço.',
          description: e.message
        })
      })
  }, [getKeyInput])

  return (
    <AdminContainer>
      {stepPix < 2 && (
        <>
          <Title text="Enviar Pix" back={() => navigate(-1)} />
          <label className="text-base font-medium">
            Insira os dados da Chave Pix
          </label>
          <div
            className={cn(
              'flex h-12 w-full  items-center gap-2 rounded-xl border-2 p-2 px-2 py-1 text-lg font-semibold shadow-none transition-transform duration-300',
              stepPix > 0 ? 'border-[#008000]' : 'border-colorPrimary-500'
            )}
          >
            <Input
              className="border-none p-0 text-lg shadow-none"
              type="text"
              value={getKeyInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setGetKeyInput(e.target.value)
              }}
            />
            <Button
              variant="ghost"
              className="w-fit p-0 hover:text-colorSecondary-500"
              disabled={getKeyInput.length <= 0}
              onClick={CheckKeyInputPix}
            >
              <CheckCircle2 size={32} />
            </Button>
          </div>

          <div className={cn('flex', stepPix > 0 ? 'flex-row' : 'flex-row-reverse')}>
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
        </>
      )}

      {stepPix === 1 && (
        <>
          <div className="text-sm font-normal">
            <div className="flex items-center gap-2">
              <label>Para:</label>
              <h4 className="text-base font-semibold">{data.name}</h4>
            </div>
            <div className="flex items-center gap-2">
              <label>CPF/CNPJ:</label>
              <h4 className="text-base font-semibold">
                {formatDoc(data.doc, data.doc.length > 12 ? 'cnpj' : 'cpf')}
              </h4>
              <label>Banco:</label>
              <h4 className="text-base font-semibold">{data.bank}</h4>
            </div>
            <div className="flex items-center gap-2">
              <label>Chave pix:</label>
              <h4 className="text-base font-semibold">{data.key}</h4>
            </div>
          </div>
          <PixForm
            key="pix-form"
            step={setStepPix}
            amount={setGetAmountForm}
            keyPix={getKeyInput}
            bank={data.bank}
            doc={data.doc}
            name={data.name}
          />
        </>
      )}
      {stepPix === 2 && (
        <PixSuccess
          key="pix-success"
          name={data.name}
          bank={data.bank}
          ag=""
          cont=""
          time=""
          transaction=""
          amount={getAmountForm}
        />
      )}
    </AdminContainer>
  )
}

export default PixStep