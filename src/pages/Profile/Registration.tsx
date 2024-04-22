import { IconAddress } from '@/components/icons/Address'
import { IconEmail } from '@/components/icons/Email'
import { IconMovingCar } from '@/components/icons/MovingCar'
import { AdminContainer } from '@/components/layout/Container'
import TwoFactorAuthValidator from '@/components/layout/Input/TwoFactorAuthValidator'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Title } from '@/components/layout/Text/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import UserApi from '@/services/UserApi'
import { maskOfCep, maskOfEmail } from '@/utils/masksFunctions'
import md5 from 'md5'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const Registration: React.FC = () => {
  const navigate = useNavigate()
  const [changeAddressStep, setChangeAddressStep] = useState<number>(0)
  const [getCodeAddress, setGetCodeAddress] = useState<string>('')
  const [openModalValidation, setOpenModalValidation] = useState<boolean>(false)
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

  const {
    data: profile,
    isLoading,
    isError
  } = useQuery({
    queryKey: 'get-profile',
    queryFn: async () => {
      const res = await UserApi.getProfile()
      return res
    }
  })

  const handleChangeAddress = async () => {
    await UserApi.getAddressCode()
      .then((res) => {
        console.log('sucess ->', res.success)
        setGetCodeAddress(res.success.match(/:\s*(\w+)/)?.[1])
        setOpenModalValidation(!openModalValidation)
      })
      .catch((e: Error) => {
        console.log('error ->', e)
        toast({
          variant: 'destructive',
          title: 'Erro ao gerar código de alteração de endereço.',
          description: e.message
        })
      })
  }

  const handleCheckCode = async () => {
    await UserApi.checkAddressCode({ code: getCodeAddress })
      .then((res) => {
        console.log('sucess ->', res.success)
        toast({
          variant: 'success',
          title: 'Seu código foi confirmado com sucesso!',
          description: ''
        })
        setOpenModalValidation(false)
        setChangeAddressStep(2)
      })
      .catch((e: Error) => {
        console.log('error ->', e)
        toast({
          variant: 'destructive',
          title: 'Erro ao confirmar código para alteração endereço',
          description: e.message
        })
      })
  }

  const handleUpdateAddressProfile = async () => {
    await UserApi.updateAddress({
      code: getCodeAddress,
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
        console.log('sucess ->', res.success)
        toast({
          variant: 'success',
          title: 'Seu código foi confirmado com sucesso!',
          description: ''
        })
        setOpenModalPwd(false)
        setChangeAddressStep(0)
      })
      .catch((e: Error) => {
        console.log('error ->', e)
        toast({
          variant: 'destructive',
          title: 'Erro ao confirmar código para alteração endereço',
          description: e.message
        })
      })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setStateChangeAddress((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value
    }))
  }

  const isFormValid = Object.values(stateChangeAddress).every(
    (value) => value.trim() !== ''
  )

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Falha ao carregar dados da conta.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-full w-full rounded-lg" />
      ) : (
        <AdminContainer>
          <Title
            text={changeAddressStep < 1 ? 'Dados cadastrais' : 'Alterar endereço'}
            back={
              changeAddressStep < 1
                ? () => navigate(-1)
                : () => setChangeAddressStep((prevState) => prevState - 1)
            }
          />
          {changeAddressStep !== 2 && (
            <>
              <div>
                <h2 className="text-base font-bold">{profile?.name}</h2>
                <h4 className="text-sm">Banco: -</h4>
                <h4 className="text-sm">
                  Agência {profile?.agency} Conta: {profile?.account}
                </h4>
              </div>
              <div className="flex flex-row-reverse">
                <Separator className="w-[52%] bg-colorSecondary-500" />
              </div>
            </>
          )}
          {changeAddressStep === 0 ? (
            <>
              <div className="flex items-center justify-around">
                <div className="flex flex-col gap-4">
                  <h2 className="flex items-center gap-2 text-sm">
                    <IconEmail className="w-6 fill-colorPrimary-500" />
                    {maskOfEmail(profile ? profile.email : '')}
                  </h2>
                  <h2 className="flex items-start gap-2 text-sm">
                    <IconAddress className="w-6 fill-colorPrimary-500" />
                    <div>
                      <p>
                        {profile?.street || '-'}, n. {profile?.st_number || '-'}
                      </p>
                      <p>
                        {profile?.district || '-'} - {profile?.city || '-'}/
                        {profile?.state || '-'}
                      </p>
                      <p>CEP: {maskOfCep(profile ? profile.zip : 'xxxxxx-xxx')}</p>
                    </div>
                  </h2>
                </div>
                <Button
                  className="flex items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-6 text-base font-medium text-colorPrimary-500"
                  variant="ghost"
                  onClick={() => setChangeAddressStep(1)}
                >
                  <IconMovingCar className="w-8 fill-colorPrimary-500" />
                  Alterar endereço
                </Button>
              </div>
              <Separator className="w-[52%] bg-colorSecondary-500" />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">
                  Canal de Comunicação com os titulares de dados pessoais
                </h4>
                <p>
                  Este é nosso canal dedicado à Lei Geral de Proteção de Dados
                  (LGPD), para garantir a transparência e proteção dos seus dados
                  pessoais.
                </p>
                <p>
                  Aqui, você pode exercer seus direitos, esclarecer dúvidas e
                  reportar incidentes relacionados à privacidade dos seus dados.
                </p>
                <p>
                  Entre em contato conosco através de seu e-mail cadastrado em sua
                  conta para nosso endereço eletrônico:{' '}
                  <span className="font-semibold">{profile?.email_white_label}</span>
                  .
                </p>
                <p> Agradecemos sua confiança e estamos à disposição para ajudar.</p>
              </div>
            </>
          ) : changeAddressStep === 1 ? (
            <div className="flex flex-col gap-4 text-base text-colorPrimary-500">
              <p>
                Para evitar fraudes, enviaremos um código para seu e-mail cadastrado.
                Insira-o para prosseguir com a alteração de seu endereço de cadastro.
              </p>
              <Button
                className="flex w-full items-center justify-start gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-6 text-base font-medium text-colorPrimary-500"
                onClick={handleChangeAddress}
                variant="ghost"
              >
                <IconMovingCar className="w-8 fill-colorPrimary-500" />
                Prosseguir com a alteração de endereço
              </Button>
              <ModalDefault
                openModal={openModalValidation}
                setOpenModal={setOpenModalValidation}
                body={
                  <>
                    <h4>Digite o código de verificação enviado em seu e-mail</h4>
                    <Input
                      className="text-xl font-semibold text-colorPrimary-500"
                      value={getCodeAddress}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setGetCodeAddress(e.target.value)
                      }
                    />
                  </>
                }
                ArrayButton={
                  <>
                    <Button
                      className="rounded-md bg-[#008000]"
                      onClick={handleCheckCode}
                    >
                      Confirmar
                    </Button>
                    <Button
                      className="rounded-md bg-[#FF0000]"
                      onClick={() => setOpenModalValidation(!openModalValidation)}
                    >
                      Cancelar
                    </Button>
                  </>
                }
              />
            </div>
          ) : changeAddressStep === 2 ? (
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
                  <Button
                    className="w-6/12 p-2 text-base"
                    disabled={!isFormValid}
                    onClick={() => setOpenModalPwd(!openModalPwd)}
                  >
                    Prosseguir para a revisão
                  </Button>
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
                      <Button
                        className="w-full rounded-md bg-[#008000]"
                        onClick={handleUpdateAddressProfile}
                      >
                        Enviar agora
                      </Button>
                    </>
                  }
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </AdminContainer>
      )}
    </>
  )
}

export default Registration
