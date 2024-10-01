import { ButtonNext, CardForLogin, ToastLogin } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useCheckHash, useGetCode, useGetKey } from '@/services/AuthApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { CheckCircle2, RotateCw } from 'lucide-react'
import QRCode from 'qrcode.react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { currentStepEmail, signIn } = useAtlas()
  const [inputPassword, setInputPassword] = useState<string>('')
  const [inputRef, setInputRef] = useState<string>('')
  const [genQRCode, setGenQRCode] = useState<boolean>(false)
  const [checkValidate, setCheckValidade] = useState<boolean>(true)
  const { mutate: getKey, isLoading } = useGetKey()
  const {
    data: genCode,
    isLoading: loadGetCode,
    refetch: GetCodeRefetch
  } = useGetCode()
  const { mutate: checkHash } = useCheckHash()

  const handleGetKey = () => {
    const id_key = Number(inputRef)
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
          <CardForLogin
            title="Para acessar sua conta, siga os passos abaixo:"
            content={
              <div className="flex items-center justify-between gap-8">
                <div className="text-justify text-xs leading-5 text-system-cinza">
                  <p className="mb-4 mr-1">
                    <strong>
                      1. Acesse a conta da sua empresa através do celular
                    </strong>
                    : Abra o aplicativo no seu celular e faça login na sua conta
                    empresarial.
                  </p>
                  <p className="mb-4 py-1">
                    <strong>2. Toque em Meu Perfil</strong>: Dentro do aplicativo,
                    localize a seção "Meu Perfil" no menu principal e toque nela.
                  </p>
                  <p className="mb-4 py-1">
                    <strong>3. Toque em Acessar Portal PJ</strong>: Dentro da página
                    do seu perfil, você encontrará a opção "Acessar Portal PJ". Toque
                    nesta opção para prosseguir.
                  </p>
                  <p className="mb-4 py-1">
                    <strong>
                      4. Aponte seu celular para esta tela para escanear o QR Code
                    </strong>
                    : Agora, segure seu celular na frente da tela do seu computador
                    ou dispositivo onde você está visualizando esta mensagem. O
                    aplicativo do banco abrirá automaticamente a câmera para escanear
                    o QR Code exibido na tela.
                  </p>
                  <p className="py-1">
                    <strong>
                      5. Digite o token com 8 dígitos que aparecerá em seu celular
                    </strong>
                    : Após escanear o QR Code, seu celular exibirá uma chave de
                    segurança de 8 dígitos. Digite este token no local indicado na
                    tela do seu computador ou dispositivo para concluir o acesso ao
                    Portal PJ.
                  </p>
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
            footer={<></>}
          />
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
                    inputPassword.length < 8
                      ? 'border-prtext-primary-default'
                      : 'border-system-green'
                  )}
                  value={inputPassword.replace(/./g, '*')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputPassword(e.target.value)
                  }
                  maxLength={8}
                  type="text"
                />
                <div className="flex justify-end ">
                  <ButtonNext
                    title="Enviar agora"
                    func={() => {}}
                    disabled={inputPassword.length < 8}
                    classPlus={`h-12 w-5/12 rounded-lg bg-se text-base font-bold text-primary-default',
                      ${inputPassword.length < 8 && 'bg-[#BEBEBE] text-[#7E7E7E]'}`}
                  />
                </div>
              </div>
            }
            footer={<></>}
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
                value={inputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInputRef(e.target.value)
                }}
              />
              <span className="text-xs italic text-primary-default">
                clique para validar:
              </span>
              <Button
                variant="ghost"
                className="w-fit p-0 hover:text-primary-default"
                disabled={inputRef.length < 1}
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
