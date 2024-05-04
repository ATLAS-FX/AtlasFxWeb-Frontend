import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconAddress } from '@/components/icons/Address'
import { IconEmailCircle } from '@/components/icons/EmailCircle'
import { IconMovingCar } from '@/components/icons/MovingCar'
import { Separator } from '@/components/ui/separator'
import { Dispatch, SetStateAction } from 'react'

interface IRegistratrionChange {
  name: string
  agency: string
  account: string
  email: string
  emailWhite: string
  street: string
  number: string
  state: string
  district: string
  city: string
  zip: string
  step: Dispatch<SetStateAction<number>>
}

export const RegistratrionChange: React.FC<IRegistratrionChange> = ({
  name,
  agency,
  account,
  email,
  emailWhite,
  street,
  number,
  district,
  city,
  zip,
  state,
  step
}) => {
  return (
    <>
      <div>
        <h2 className="text-base font-bold">{name}</h2>
        <h4 className="text-sm">Banco: -</h4>
        <h4 className="text-sm">
          Agência {agency} Conta: {account}
        </h4>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-sm">
            <IconEmailCircle className="w-6 fill-colorPrimary-500" />
            {email}
          </h2>
          <h2 className="flex items-start gap-2 text-sm">
            <IconAddress className="w-6 fill-colorPrimary-500" />
            <div>
              <p>
                {street}, n. {number}
              </p>
              <p>
                {district} - {city}/{state}
              </p>
              <p>CEP: {zip}</p>
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
          <span className="font-semibold">{emailWhite}</span>.
        </p>
        <p> Agradecemos sua confiança e estamos à disposição para ajudar.</p>
      </div>
    </>
  )
}
