import { ButtonNext } from '@/components/Buttons/ButtonNext'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import UserApi from '@/services/UserApi'
import md5 from 'md5'
import { Dispatch, SetStateAction, useState } from 'react'

interface IRegistrationForm {
  code: string
  step: Dispatch<SetStateAction<number>>
  refetch: () => void
}

export const RegistrationForm: React.FC<IRegistrationForm> = ({
  code,
  step,
  refetch
}) => {
  const [openModalPwd, setOpenModalPwd] = useState<boolean>(false)
  const [pwdCode, setPwdCode] = useState<string>('')

  const [stateChangeAddress, setStateChangeAddress] = useState<{
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
  }>({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  })

  const handleUpdateAddressProfile = async () => {
    await UserApi.updateAddress({
      code: code,
      city: stateChangeAddress.cidade,
      district: stateChangeAddress.bairro,
      pwd: md5(pwdCode),
      st_comp: stateChangeAddress.complemento,
      st_number: stateChangeAddress.numero,
      state: stateChangeAddress.cidade,
      street: stateChangeAddress.logradouro,
      uf: stateChangeAddress.uf,
      zip: stateChangeAddress.cep
    })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu código foi confirmado com sucesso!',
          description: res.success
        })
        refetch()
        setOpenModalPwd(false)
        step(3)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao confirmar código para alteração endereço',
          description: e.message
        })
      })
  }

  const isFormValid = Object.values(stateChangeAddress).every(
    (value) => value.trim() !== ''
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setStateChangeAddress((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value
    }))
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Insira seu novo endereço</h4>
        {Object.keys(stateChangeAddress).map((key, index) => (
          <div
            key={index}
            className='text-colorPrimary-500" flex items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-sm font-medium'
          >
            <label
              className={cn(
                'capitalize',
                index === 0 && 'uppercase',
                index === 6 && 'uppercase'
              )}
            >
              {key}:{' '}
            </label>
            <Input
              className="border-none p-0 shadow-none"
              type="text"
              value={
                stateChangeAddress[
                  key.toLowerCase() as keyof typeof stateChangeAddress
                ]
              }
              onChange={(e) => handleChange(e, key.toLowerCase())}
            />
          </div>
        ))}
        <div className="mt-1 flex justify-end">
          <ButtonNext
            title="Prosseguir para a revisão"
            disabled={!isFormValid}
            func={() => setOpenModalPwd(!openModalPwd)}
          />
        </div>
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
                disabled={pwdCode.length === 6}
                title="Enviar agora"
                func={handleUpdateAddressProfile}
                classPlus="rounded-xl w-full bg-[#008000]"
              />
            </>
          }
        />
      </div>
    </>
  )
}
