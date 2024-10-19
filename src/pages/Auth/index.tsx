import {
  IconEyeHide,
  IconEyeReveal,
  IconPadLock,
  IconUser
} from '@/components/icons'
import { ButtonNext, CardForLogin, ToastLogin } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import {
  useCheckHash,
  useCredentials,
  useGetCode,
  useGetKey
} from '@/services/AuthApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { formattedDoc } from '@/utils/GenerateFormatted'
import { CheckCircle2, RotateCw } from 'lucide-react'
import md5 from 'md5'
import QRCode from 'qrcode.react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { currentStepEmail, signIn } = useAtlas()
  const [authFlow, setAuthFlow] = useState<{
    inputKey: string
    doc: string
    maskDoc: string
    pwd: string
    hidePwd: boolean
  }>({
    inputKey: '',
    doc: '',
    maskDoc: '',
    pwd: '',
    hidePwd: true
  })
  const [flowLogin, setFlowLogin] = useState<boolean>(false)
  const [genQRCode, setGenQRCode] = useState<boolean>(false)
  const [checkValidate, setCheckValidade] = useState<boolean>(true)
  const { mutate: login, isLoading: loadLogin } = useCredentials()
  const { mutate: getKey, isLoading } = useGetKey()
  const {
    data: genCode,
    isLoading: loadGetCode,
    refetch: GetCodeRefetch
  } = useGetCode()
  const { mutate: checkHash } = useCheckHash()

  const handleLogin = () => {
    login(
      { doc: authFlow.doc, pwd: md5(authFlow.pwd) },
      {
        onSuccess: (res) => {
          if (res.key) {
            signIn(res.key)
            navigate('/')
          }
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          setCheckValidade(true)
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  const handleGetKey = () => {
    const id_key = Number(authFlow.inputKey)
    getKey(
      { id: id_key },
      {
        onSuccess: (res) => {
          if (res.key) {
            signIn(res.key)
            navigate('/')
          }
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          setCheckValidade(true)
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
    if (!genQRCode) {
      const qrCodeTimeout = setTimeout(() => {
        setGenQRCode(true)
      }, 48000)
      return () => clearTimeout(qrCodeTimeout)
    }
  }, [genQRCode, genCode])

  useEffect(() => {
    const checkHashInterval = setInterval(() => {
      const hash = genCode ? genCode.hash : ''
      if (checkValidate) {
        checkHash(
          { hash: hash },
          {
            onSuccess: (res) => {
              setCheckValidade(false)
              clearInterval(checkHashInterval)
              if (res.key) {
                signIn(res.key)
                navigate('/')
              }
            },
            onError: (error: unknown) => {
              const { response } = error as ErrorResponse
              console.error(response)
            }
          }
        )
      }
    }, 1250)
    return () => clearInterval(checkHashInterval)
  }, [checkValidate, genCode])

  return (
    <>
      <div>
        {currentStepEmail < 1 ? (
          <>
            {flowLogin ? (
              <CardForLogin
                title={<h2 className="mt-3 text-3xl">Login</h2>}
                back={() => setFlowLogin(!flowLogin)}
                content={
                  <section className="flex h-full flex-col gap-6">
                    <div className="flex items-center gap-2 rounded-lg border-2 border-system-cinza/25 px-2 py-4">
                      <IconUser className="z-10 size-5 fill-primary-default" />
                      <Separator className="m-auto h-6 w-[1px] bg-system-cinza/25" />
                      <input
                        className="w-full"
                        placeholder="CNPJ"
                        type="text"
                        value={authFlow.maskDoc}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const format = formattedDoc(e.target.value)
                          setAuthFlow({
                            ...authFlow,
                            doc: e.target.value,
                            maskDoc: format ?? e.target.value
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-start gap-2 rounded-lg border-2 border-system-cinza/25 p-2">
                      <IconPadLock className="z-10 size-5 fill-primary-default" />
                      <Separator className="m-auto h-6 w-[1px] bg-system-cinza/25" />
                      {/* <input
                        className="w-full"
                        placeholder="Senha do app"
                        value={pwdRef}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPwdRef(e.target.value)
                          }
                          /> */}
                      <div className="relative w-full">
                        <Input
                          className="h-fit w-full border-none p-2 text-base"
                          placeholder="Senha do App"
                          type={authFlow.hidePwd ? 'password' : 'text'}
                          value={authFlow.pwd}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setAuthFlow({ ...authFlow, pwd: e.target.value })
                          }}
                          pattern="\d*"
                        />
                        <button
                          className="absolute right-0 top-0 flex h-fit w-fit items-center gap-2 bg-transparent p-2 transition-all duration-300 ease-in-out"
                          onClick={() => {
                            setAuthFlow({ ...authFlow, hidePwd: !authFlow.hidePwd })
                          }}
                        >
                          {authFlow.hidePwd ? (
                            <IconEyeHide
                              size={24}
                              className="hover:fill-primary-default/50 mr-2 fill-primary-default transition-all duration-300 ease-in-out"
                            />
                          ) : (
                            <IconEyeReveal
                              size={24}
                              className="hover:fill-primary-default/50 mr-2 fill-primary-default transition-all duration-300 ease-in-out"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <label className="text-primary-default underline">
                        Esqueci minha senha
                      </label>
                    </div>
                    <ButtonNext
                      // classPlus="mt-2 rounded-lg bg-primary-default py-6"
                      disabled={authFlow.doc.length <= 4 || authFlow.pwd.length <= 5}
                      loading={loadLogin}
                      func={handleLogin}
                      title="Acessar"
                    />
                  </section>
                }
              />
            ) : (
              <CardForLogin
                title="Para acessar sua conta, siga os passos abaixo:"
                content={
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex w-7/12 flex-col gap-2 text-justify text-xs leading-4 text-system-cinza">
                      <p>
                        <span className="font-semibold">
                          1. Acesse a conta da sua empresa através do celular
                        </span>
                        : Abra o aplicativo no seu celular e faça login na sua conta
                        empresarial.
                      </p>
                      <p>
                        <span className="font-semibold">2. Toque em Meu Perfil</span>
                        : Dentro do aplicativo, localize a seção "Meu Perfil" no menu
                        principal e toque nela.
                      </p>
                      <p>
                        <span className="font-semibold">
                          3. Toque em Acessar Portal PJ
                        </span>
                        : Dentro da página do seu perfil, você encontrará a opção
                        "Acessar Portal PJ". Toque nesta opção para prosseguir.
                      </p>
                      <p>
                        <span className="font-semibold">
                          4. Aponte seu celular para esta tela para escanear o QR
                          Code
                        </span>
                        : Agora, segure seu celular na frente da tela do seu
                        computador ou dispositivo onde você está visualizando esta
                        mensagem. O aplicativo do banco abrirá automaticamente a
                        câmera para escanear o QR Code exibido na tela.
                      </p>
                      <p>
                        <span className="font-semibold">
                          5. Digite o token com 8 dígitos que aparecerá em seu
                          celular
                        </span>
                        : Após escanear o QR Code, seu celular exibirá uma chave de
                        segurança de 8 dígitos. Digite este token no local indicado
                        na tela do seu computador ou dispositivo para concluir o
                        acesso ao Portal PJ.
                      </p>
                      <Button
                        className="mt-4 w-40 bg-primary-default py-5"
                        onClick={() => setFlowLogin(!flowLogin)}
                      >
                        Entrar com CNPJ
                      </Button>
                    </div>
                    <div
                      className={cn(
                        'relative flex h-fit justify-start rounded-md bg-white p-6 shadow-md transition-all'
                      )}
                    >
                      {genQRCode && (
                        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-background/80 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>
                      )}
                      {loadGetCode ? (
                        <Skeleton className="h-[180px] w-[180px] rounded-md bg-primary/20" />
                      ) : (
                        <>
                          {genQRCode && (
                            <button
                              className="absolute bottom-auto left-auto right-auto top-auto z-20 flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-[50%] bg-primary-default text-white"
                              onClick={() => {
                                GetCodeRefetch()
                                setGenQRCode(false)
                              }}
                            >
                              <RotateCw size={42} />
                              <span className="w-10/12 text-center">
                                Clique para recarregar o QRCode
                              </span>
                            </button>
                          )}
                          <QRCode value={genCode ? genCode?.hash : ''} size={180} />
                        </>
                      )}
                    </div>
                  </div>
                }
              />
            )}
          </>
        ) : (
          <CardForLogin
            title="Acesse"
            content={
              <div className="flex flex-col gap-4">
                <label className="text-sm text-primary-default">
                  Digite o a Chave de Segurança de 8 dígitos
                </label>
                <Input
                  className={cn(
                    'flex h-16 w-full justify-center rounded-lg border-2 pt-[2.5%] text-center align-baseline text-5xl font-bold text-primary-default',
                    authFlow.pwd.length < 8
                      ? 'border-prtext-primary-default'
                      : 'border-system-green'
                  )}
                  value={authFlow.inputKey.replace(/./g, '*')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAuthFlow({ ...authFlow, inputKey: e.target.value })
                  }
                  maxLength={8}
                  type="text"
                />
                <div className="flex justify-end ">
                  <ButtonNext
                    title="Enviar agora"
                    func={() => {}}
                    disabled={authFlow.inputKey.length < 8}
                    classPlus={`h-12 w-5/12 rounded-lg bg-se text-base font-bold text-primary-default',
                      ${authFlow.inputKey.length < 8 && 'bg-[#BEBEBE] text-[#7E7E7E]'}`}
                  />
                </div>
              </div>
            }
          />
        )}
        {import.meta.env.VITE_NODE_ENV === 'development' && (
          <div className="justify-star mt-2 flex items-center justify-end gap-1 text-primary-default">
            <div className="flex cursor-pointer items-center gap-2">
              <span className="text-xs italic text-primary-default">
                Digita seu código:
              </span>
              <Input
                className="w-12"
                value={authFlow.inputKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAuthFlow({ ...authFlow, inputKey: e.target.value })
                }}
              />
              <Button
                variant="ghost"
                className="w-fit p-0 hover:text-primary-default"
                disabled={authFlow.inputKey.length < 1}
                onClick={handleGetKey}
              >
                <CheckCircle2 size={32} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <ToastLogin
        title="Realizando Login..."
        openModal={isLoading}
        setOpenModal={null}
      />
    </>
  )
}

export default Login
