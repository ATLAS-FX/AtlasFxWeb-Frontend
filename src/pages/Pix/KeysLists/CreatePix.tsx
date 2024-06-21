import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import PixApi from '@/services/PixApi'
import { generatePixKey } from '@/utils/GenerateCode'
import { listPixButton } from '@/utils/PixListButtons'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface ICreatePix {
  refetch: () => {}
  step: Dispatch<SetStateAction<number>>
}

const CreatePix: React.FC<ICreatePix> = ({ refetch, step }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formCreateKeyPix, setFormCreateKeyPix] = useState<{
    step: number
    type: string
    key: string
  }>({
    step: 0,
    type: '',
    key: ''
  })

  const validNames = new Set(['CNPJ', 'CPF', 'Celular', 'E-mail', 'Chave aleatória'])

  const handleCreateKeyPix = async (type: string, key: string) => {
    setLoading(true)
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
      .catch((e: ErrorResponse) => {
        toast({
          variant: 'destructive',
          title: e.response?.data?.error,
          description: 'Erro ao criada chave pix'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex w-full items-center justify-evenly py-4">
        {listPixButton
          .filter((item) => validNames.has(item.name))
          .map(({ name, icon: Icon, type }, number) => (
            <ButtonAtlas
              key={number}
              title={name}
              icon={Icon}
              sizeIcon={number === 4 ? 28 : 32}
              classButton={`flex h-20 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-colorPrimary-500 bg-transparent fill-colorPrimary-500 text-colorPrimary-500 shadow-md shadow-slate-400 drop-shadow-md transition-all duration-300 ease-out hover:bg-colorPrimary-500 hover:fill-white hover:text-white text-center,
                 ${
                   formCreateKeyPix.type === type &&
                   'border-primary/90 bg-primary/90 text-white shadow-none drop-shadow-none transition-transform duration-300 fill-white'
                 }`}
              classDiv="flex-col text-xs text-center"
              click={() => {
                type !== 'key-random'
                  ? setFormCreateKeyPix((prevState) => ({
                      ...prevState,
                      type: type,
                      step: 1,
                      key: ''
                    }))
                  : setFormCreateKeyPix((prevState) => ({
                      ...prevState,
                      type: type,
                      step: 2,
                      key: generatePixKey()
                    }))
              }}
            />
          ))}
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      {formCreateKeyPix.step === 1 && (
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
            <ButtonNext
              title="Prosseguir"
              loading={loading}
              disabled={formCreateKeyPix.key.length <= 0}
              func={() =>
                handleCreateKeyPix(formCreateKeyPix.type, formCreateKeyPix.key)
              }
            />
          </div>
        </>
      )}
      {formCreateKeyPix.step === 2 && (
        <>
          <label className="mb-4 text-lg font-medium">
            Sua chave aleatoria será gerada
          </label>
          <div className="flex justify-end">
            <ButtonNext
              title="Prosseguir"
              loading={loading}
              func={() =>
                handleCreateKeyPix(formCreateKeyPix.type, formCreateKeyPix.key)
              }
            />
          </div>
        </>
      )}
    </>
  )
}

export default CreatePix
