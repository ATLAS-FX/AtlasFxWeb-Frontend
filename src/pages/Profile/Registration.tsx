import { IconAddress } from '@/components/icons/Address'
import { IconEmail } from '@/components/icons/Email'
import { IconMovingCar } from '@/components/icons/MovingCar'
import { Title } from '@/components/layout/Text/Title'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import UserApi from '@/services/UserApi'
import { maskOfCep, maskOfEmail } from '@/utils/masksFunctions'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const Registration: React.FC = () => {
  const navigate = useNavigate()
  const [changeAddressStep, setChangeAddressStep] = useState<number>(0)
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
        <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-8 text-sm font-light text-colorPrimary-500 xl:text-xs">
          <Title
            text={changeAddressStep < 1 ? 'Dados cadastrais' : 'Alterar endereço'}
            back={
              changeAddressStep < 1
                ? () => navigate(-1)
                : () => setChangeAddressStep((prevState) => prevState - 1)
            }
          />
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
          {changeAddressStep < 1 ? (
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
                        {profile?.street}, n. {profile?.st_comp}
                      </p>
                      <p>
                        {profile?.district} - {profile?.city}/{profile?.state}
                      </p>
                      <p>CEP: {maskOfCep(profile ? profile.zip : '')}</p>
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
          ) : (
            <div className="flex flex-col gap-4 text-base text-colorPrimary-500">
              <p>
                Para evitar fraudes, enviaremos um código para seu e-mail cadastrado.
                Insira-o para prosseguir com a alteração de seu endereço de cadastro.
              </p>
              <Button
                className="flex w-full items-center justify-start gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-6 text-base font-medium text-colorPrimary-500"
                variant="ghost"
              >
                <IconMovingCar className="w-8 fill-colorPrimary-500" />
                Prosseguir com a alteração de endereço
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Registration
