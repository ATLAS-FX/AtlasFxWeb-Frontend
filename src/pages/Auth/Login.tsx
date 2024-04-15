import CardForLogin from '@/components/layout/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { useAdm } from '@/contexts/UserContext'
import AuthApi from '@/services/AuthApi'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const Login: React.FC = () => {
  const { currentStepEmail } = useAdm()

  const {
    data: qrcode,
    isLoading,
    isError
  } = useQuery({
    queryKey: 'get-qrcode',
    queryFn: async () => {
      const res = await AuthApi.getQrCode()
      return res
    }
  })

  console.log(qrcode)

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Falha ao carregar dados de usuários.',
        description: 'Por favor tente mais tarde!',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    }
  }, [isError])

  return (
    <div>
      {isLoading ? (
        <Skeleton className="w-100 h-96 rounded-md" />
      ) : (
        <>
          {currentStepEmail.step <= 1 ? (
            <CardForLogin
              title="Acesse"
              subtitle="Sua Conta"
              option="Portal PJ"
              content={
                <div className="flex items-center justify-between gap-10">
                  <div>
                    <Separator className="bg-colorSecondary-500" />
                    <p className="py-4 text-colorPrimary-500">
                      Para fazer o login, informe seu número de conta e dígito
                    </p>
                    <Separator className="mb-4 bg-colorSecondary-500" />
                    <div className="text-justify text-xs text-colorPrimary-500">
                      <p className="py-2">
                        <strong>
                          1. Acesse a conta da sua empresa através do celular
                        </strong>
                        : Abra o aplicativo no seu celular e faça login na sua conta
                        empresarial.
                      </p>
                      <p className="py-2">
                        <strong>2. Toque em Meu Perfil</strong>: Dentro do
                        aplicativo, localize a seção "Meu Perfil" no menu principal e
                        toque nela.
                      </p>
                      <p className="py-2">
                        <strong>3. Toque em Acessar Portal PJ</strong>: Dentro da
                        página do seu perfil, você encontrará a opção "Acessar Portal
                        PJ". Toque nesta opção para prosseguir.
                      </p>
                      <p className="py-2">
                        <strong>
                          4. Aponte seu celular para esta tela para escanear o QR
                          Code
                        </strong>
                        : Agora, segure seu celular na frente da tela do seu
                        computador ou dispositivo onde você está visualizando esta
                        mensagem. O aplicativo do banco abrirá automaticamente a
                        câmera para escanear o QR Code exibido na tela.
                      </p>
                      <p className="py-2">
                        <strong>
                          5. Digite o token com 8 dígitos que aparecerá em seu
                          celular
                        </strong>
                        : Após escanear o QR Code, seu celular exibirá uma chave de
                        segurança de 8 dígitos. Digite este token no local indicado
                        na tela do seu computador ou dispositivo para concluir o
                        acesso ao Portal PJ.
                      </p>
                    </div>
                  </div>
                  <div className="flex h-fit justify-center rounded-md bg-white p-6 shadow-md transition-all sm:w-full">
                    <QRCode value="https://google.com" size={200} />
                  </div>
                </div>
              }
              footer={<></>}
            />
          ) : (
            <CardForLogin
              title="Acesse"
              subtitle="Sua Conta"
              option="Portal PJ"
              content={
                <>
                  <Separator className="bg-colorSecondary-500" />
                  <label className="text-sm text-colorPrimary-500">
                    Digite o a Chave de Segurança de 8 dígitos
                  </label>
                  <Input />
                  <Button>Enviar agora</Button>
                </>
              }
              footer={<></>}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Login
