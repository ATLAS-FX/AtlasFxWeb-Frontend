import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import PixApi from '@/services/PixApi'
import { listPixButton } from '@/utils/PixListButtons'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface ICreatePix {
  refetch: () => {}
  step: Dispatch<SetStateAction<number>>
}

const CreatePix: React.FC<ICreatePix> = ({ refetch, step }) => {
  const [stepCreate, setStepCreate] = useState<number>(0)
  const [formCreateKeyPix, setFormCreateKeyPix] = useState<{
    type: string
    key: string
  }>({ type: '', key: '' })

  const validNames = new Set(['CNPJ', 'CPF', 'Celular', 'E-mail', 'Chave aleatória'])

  const handleCreateKeyPix = async (type: string, key: string) => {
    await PixApi.createdKeyPix({ key_type: type, key_code: key })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu chave pix foi criada com sucesso!',
          description: res.success
        })
        refetch()
        step(2)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao criada chave pix',
          description: e.message
        })
      })
  }

  return (
    <>
      <div className="flex w-full items-center justify-start gap-2 py-4">
        {listPixButton
          .filter((item) => validNames.has(item.name))
          .map(({ name, icon: Icon, type }, number) => (
            <Button
              className="flex h-20 w-24 cursor-pointer flex-col items-center justify-center gap-1  rounded-xl border-2 border-colorPrimary-500 bg-transparent fill-colorPrimary-500 text-colorPrimary-500 transition-all duration-300 ease-out hover:bg-colorPrimary-500 hover:fill-white hover:text-white"
              key={number}
              onClick={() => {
                setStepCreate(1)
                setFormCreateKeyPix((prevState) => ({ ...prevState, type: type }))
              }}
            >
              <Icon size={number === 4 ? 28 : 32} />
              <span className="text-center text-xs font-medium">{name}</span>
            </Button>
          ))}
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      {stepCreate === 1 && (
        <>
          <label className="text-base font-medium">Nova chave pix</label>
          <Input
            className={cn(
              'h-12 w-full items-center gap-2 rounded-xl border-2 p-2 px-2 py-1 text-lg font-medium shadow-none transition-transform duration-300',
              formCreateKeyPix.key.length > 0
                ? 'border-[#008000]'
                : 'border-colorPrimary-500'
            )}
            placeholder="+ Cadastrar nova chave"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormCreateKeyPix((prevState) => ({
                ...prevState,
                key: e.target.value
              }))
            }}
          />
          <div className="flex justify-end">
            <Button
              className="w-6/12 p-2 text-base"
              disabled={formCreateKeyPix.key.length <= 0}
              onClick={() =>
                handleCreateKeyPix(formCreateKeyPix.type, formCreateKeyPix.key)
              }
            >
              Prosseguir
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default CreatePix
