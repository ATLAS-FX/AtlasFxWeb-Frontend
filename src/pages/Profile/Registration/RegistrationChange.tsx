import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconAddress } from '@/components/icons/Address'
import { IconEmailCircle } from '@/components/icons/EmailCircle'
import { IconMovingCar } from '@/components/icons/MovingCar'
import { Separator } from '@/components/ui/separator'
import { Dispatch, SetStateAction } from 'react'

interface IRegistratrionChange {
  profile: App.ProfileProps | null
  step: Dispatch<SetStateAction<number>>
}

export const RegistratrionChange: React.FC<IRegistratrionChange> = ({
  profile,
  step
}) => {
  return (
    <>
      <div>
        <h2 className="text-base font-bold">{profile?.name}</h2>
        <h4 className="text-sm">Banco: {profile?.bank}</h4>
        <h4 className="text-sm">
          Agência {profile?.agency} Conta: {profile?.account}
        </h4>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-sm">
            <IconEmailCircle className="w-6 fill-colorPrimary-500" />
            {profile?.email}
          </h2>
          <h2 className="flex items-start gap-2 text-sm">
            <IconAddress className="w-6 fill-colorPrimary-500" />
            <div>
              <p>
                {profile?.street}, n. {profile?.number}
              </p>
              <p>
                {profile?.district} - {profile?.city}/{profile?.state}
              </p>
              <p>CEP: {profile?.zip}</p>
            </div>
          </h2>
        </div>
        <ButtonAtlas
          click={() => step(1)}
          title="Alterar endereço"
          icon={IconMovingCar}
          classButton="w-5/12"
        />
      </div>
      <Separator className="w-[52%] bg-colorSecondary-500" />
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold">
          Canal de Comunicação com os titulares de dados pessoais
        </h4>
        <p>
          Este é nosso canal dedicado à Lei Geral de Proteção de Dados (LGPD), para
          garantir a transparência e proteção dos seus dados pessoais.
        </p>
        <p>
          Aqui, você pode exercer seus direitos, esclarecer dúvidas e reportar
          incidentes relacionados à privacidade dos seus dados.
        </p>
        <p>
          Entre em contato conosco através de seu e-mail cadastrado em sua conta para
          nosso endereço eletrônico:{' '}
          <span className="font-semibold">{profile?.emailWhite}</span>.
        </p>
        <p> Agradecemos sua confiança e estamos à disposição para ajudar.</p>
      </div>
    </>
  )
}
