import { IconAlert } from '@/components/icons'
import {
  ButtonAtlas,
  ButtonNext,
  MaskedInput,
  ModalDefault
} from '@/components/layout'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useConfirmCreatedKeyPix, useCreatedKeyPix } from '@/services/PixApi'
import { generatePixKey } from '@/utils/GenerateCode'
import { ListMask } from '@/utils/ListMask'
import { listPixButton } from '@/utils/PixListButtons'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

interface ICreatePix {
  refetch: () => {}
  step: Dispatch<SetStateAction<number>>
}

const CreatePix: React.FC<ICreatePix> = ({ refetch, step }) => {
  const [stateModalPix, setStateModalPix] = useState<boolean>(false)
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')
  const {
    mutate: createdKeyPix,
    isLoading: loadCreated,
    isError: errorCreated
  } = useCreatedKeyPix()
  const {
    mutate: confirmCreatedKeyPix,
    isLoading: loadConfirm,
    isError: errorConfirm
  } = useConfirmCreatedKeyPix()
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

  const handleCreateKeyPix = useCallback(
    async (type: string, key: string) => {
      createdKeyPix(
        { key_type: type, key_code: key },
        {
          onSuccess: (res) => {
            toast({
              variant: 'success',
              title: 'Seu chave pix foi criada com sucesso!',
              description: res.success
            })
            refetch()
            step(2)
          },
          onError: (e: any) => {
            toast({
              variant: 'destructive',
              title: e.response?.data?.error,
              description: 'Erro ao criada chave pix'
            })
          }
        }
      )
    },
    [createdKeyPix, refetch, step]
  )

  const handleConfirmCreatePix = useCallback(
    async (type: string) => {
      confirmCreatedKeyPix(
        { type: type, code: pwdCode },
        {
          onSuccess: (res) => {
            toast({
              variant: 'success',
              title: 'Seu chave pix foi criada com sucesso!',
              description: res.success
            })
            refetch()
            step(2)
          },
          onError: (e: any) => {
            toast({
              variant: 'destructive',
              title: e.response?.data?.error,
              description: 'Erro ao criada chave pix'
            })
          }
        }
      )
    },
    [confirmCreatedKeyPix, refetch, step]
  )

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
    if (errorConfirm || errorCreated) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [errorConfirm, errorCreated])

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
              classButton={`flex h-20 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-primary-default bg-transparent fill-primary-default text-primary-default shadow-md shadow-slate-400 drop-shadow-md transition-all duration-300 ease-out hover:bg-primary-default hover:fill-white hover:text-white text-center,
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
        <Separator className="w-[52%] bg-secondary-default" />
      </div>
      {formCreateKeyPix.step === 1 && (
        <>
          <label className="text-base font-medium">Nova chave pix</label>
          {ListMask.filter((item) => item.key === formCreateKeyPix.type).map(
            ({ key, mask, placeholder }, number) => (
              <MaskedInput
                className={cn(
                  'flex h-12 w-full items-center gap-2 rounded-xl border-2 border-primary-default p-2 px-2 py-1 text-lg font-semibold shadow-none transition-transform duration-300'
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
          <div className="flex justify-end">
            <ButtonNext
              title="Prosseguir"
              loading={loadCreated}
              disabled={formCreateKeyPix.key.length <= 0}
              func={() => {
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
              loading={loadConfirm}
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
            <Separator className="bg-primary-default" />
            <div className="flex items-center justify-between gap-2">
              <IconAlert className="w-32" />
              <h4 className="text-xs">
                Antes de finalizar a operação, confirme as informações
                cuidadosamente, uma vez que o débito realizado não poderá ser
                revertido.
              </h4>
            </div>
            <Separator className="bg-primary-default" />
            <div className="text-sm font-normal">
              <label>Você está criando uma chave pix</label>
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
            <Separator className="bg-primary-default" />
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
            <Separator className="bg-primary-default" />
            <TwoFactorAuthValidator
              className="text-primary-default"
              codeLength={6}
              onValidCode={(code) => setPwdCode(code)}
            />
            <Separator className="bg-primary-default" />
          </>
        }
        ArrayButton={
          <>
            <ButtonNext
              title="Enviar agora"
              disabled={pwdCode.trim() === ''}
              loading={loadCreated}
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
