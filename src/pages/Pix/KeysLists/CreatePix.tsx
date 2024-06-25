import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { IconAlert } from '@/components/icons/Alert'
import MaskedInput from '@/components/layout/Input/MaskedInput'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import PixApi from '@/services/PixApi'
import { generatePixKey } from '@/utils/GenerateCode'
import { ListMask } from '@/utils/ListMask'
import { listPixButton } from '@/utils/PixListButtons'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ICreatePix {
  refetch: () => {}
  step: Dispatch<SetStateAction<number>>
}

const CreatePix: React.FC<ICreatePix> = ({ refetch, step }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [stateModalPix, setStateModalPix] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const [formCreateKeyPix, setFormCreateKeyPix] = useState<{
    step: number
    type: string
    key: string
    name: string
  }>({
    step: 0,
    type: '',
    key: '',
    name: ''
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

  const handleConfirmCreatePix = async (type: string) => {
    setLoading(true)
    await PixApi.confirmCreatedKeyPix({ type: type, code: pwdCode })
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    mask: string | null
  ) => {
    const value = mask ? e.target.value.replace(/\D/g, '') : e.target.value
    setFormCreateKeyPix((prevState) => ({
      ...prevState,
      key: value
    }))
  }

  useEffect(() => {
    console.log(formCreateKeyPix.type)
  }, [formCreateKeyPix.type])

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
                      name: name,
                      type: type,
                      step: 1,
                      key: ''
                    }))
                  : setFormCreateKeyPix((prevState) => ({
                      ...prevState,
                      name: name,
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
          {ListMask.filter((item) => item.key === formCreateKeyPix.type).map(
            ({ key, mask, placeholder }, number) => (
              <MaskedInput
                className={cn(
                  'flex h-12 w-full items-center gap-2 rounded-xl border-2 border-colorPrimary-500 p-2 px-2 py-1 text-lg font-semibold shadow-none transition-transform duration-300'
                )}
                key={`${key + number}`}
                mask={mask || ''}
                placeholder={placeholder || '+ Cadastrar nova chave'}
                value={formCreateKeyPix.key}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, mask)
                }
              />
            )
          )}
          {/* <Input
            className={cn(
              'h-12 w-full items-center gap-2 rounded-xl border-2 border-colorPrimary-500 p-2 px-2 py-1 text-lg font-medium shadow-none transition-transform duration-300'
            )}
            placeholder="+ Cadastrar nova chave"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormCreateKeyPix((prevState) => ({
                ...prevState,
                key: e.target.value
              }))
            }}
          /> */}
          <div className="flex justify-end">
            <ButtonNext
              title="Prosseguir"
              loading={loading}
              disabled={formCreateKeyPix.key.length <= 0}
              func={() => {
                console.log(formCreateKeyPix)
                formCreateKeyPix.type === 'email' || formCreateKeyPix.type === 'cel'
                  ? setStateModalPix(true)
                  : handleCreateKeyPix(formCreateKeyPix.type, formCreateKeyPix.key)
              }}
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
      <ModalDefault
        title="Para seguir, verifique e confirme as informações."
        body={
          <>
            <Separator className="bg-colorPrimary-500" />
            <div className="flex items-center justify-between gap-2">
              <IconAlert className="w-32" />
              <h4 className="text-xs">
                Antes de finalizar a operação, confirme as informações
                cuidadosamente, uma vez que o débito realizado não poderá ser
                revertido.
              </h4>
            </div>
            <Separator className="bg-colorPrimary-500" />
            <div className="text-sm font-normal">
              <label>Voce está criando uma chave pix</label>
              <div className="flex items-center gap-2">
                <label>Chave:</label>
                <h4 className="text-base font-semibold">{formCreateKeyPix.key}</h4>
              </div>
              <div className="flex items-center gap-2">
                <label>Tipo de chave:</label>
                <h4 className="text-base font-semibold">{formCreateKeyPix.name}</h4>
              </div>
              <label>Data: {new Date().toLocaleDateString()}</label>
            </div>
            <Separator className="bg-colorPrimary-500" />
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
            <Separator className="bg-colorPrimary-500" />
            <TwoFactorAuthValidator
              className="text-colorPrimary-500"
              codeLength={6}
              onValidCode={(code) => setPwdCode(code)}
            />
            <Separator className="bg-colorPrimary-500" />
          </>
        }
        ArrayButton={
          <>
            <ButtonNext
              title="Enviar agora"
              disabled={pwdCode.trim() === ''}
              loading={loading}
              func={() => handleConfirmCreatePix(formCreateKeyPix.key)}
              classPlus="rounded-xl w-full bg-[#008000]"
            />
          </>
        }
      />
    </>
  )
}

export default CreatePix
