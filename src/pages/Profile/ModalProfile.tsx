import { IconEyeHide, IconEyeReveal } from '@/components/icons'
import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface ModalProfileProps {
  profile: {
    step: number
    modal: boolean
    zip: string
    street: string
    st_number: string
    st_comp: string
    state: string
    district: string
    city: string
    pwd: string
  }
  setProfile: Dispatch<
    SetStateAction<{
      step: number
      modal: boolean
      zip: string
      street: string
      st_number: string
      st_comp: string
      state: string
      district: string
      city: string
      pwd: string
    }>
  >
  updateLoad: boolean
  update: () => void
}

const ModalProfile: React.FC<ModalProfileProps> = ({
  profile,
  setProfile,
  updateLoad,
  update
}) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  return (
    <article className="flex flex-col gap-2">
      <div className="flex flex-col pt-4">
        {profile.step >= 1 ? (
          <div className="flex flex-col gap-1">
            <Button
              className="ml-[-12px] h-fit w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
              variant="ghost"
              onClick={
                profile.step > 0
                  ? () => setProfile({ ...profile, step: profile.step - 1 })
                  : () => {}
              }
            >
              <ChevronLeft size={18} />
              Voltar
            </Button>
            <h2 className="text-xl text-primary-default">Alterar Dados</h2>
          </div>
        ) : (
          <h2 className="text-xl text-primary-default">Alterar Dados</h2>
        )}
      </div>
      {profile.step === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="">CEP:</label>
            <Input
              type="text"
              value={profile.zip}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, zip: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Logradouro:</label>
            <Input
              type="text"
              value={profile.street}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, street: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Número:</label>
            <Input
              type="text"
              value={profile.st_number}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, st_number: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Complemento:</label>
            <Input
              type="text"
              value={profile.st_comp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, st_comp: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Bairro:</label>
            <Input
              type="text"
              value={profile.district}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, district: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Cidade:</label>
            <Input
              type="text"
              value={profile.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, city: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">UF:</label>
            <Input
              type="text"
              value={profile.state}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProfile({ ...profile, state: e.target.value })
              }
            />
          </div>
          <div className="mt-2 flex justify-end">
            <ButtonNext
              title="Prosseguir"
              disabled={
                !profile.zip ||
                !profile.street ||
                !profile.st_number ||
                !profile.district ||
                !profile.city ||
                !profile.state
              }
              func={() => setProfile({ ...profile, step: 1 })}
            />
          </div>
        </div>
      )}
      {profile.step === 1 && (
        <>
          <div className="mt-4 flex flex-col gap-2">
            <label className="w-fit text-sm text-system-cinza">
              Insira o código:
            </label>
            <div className="relative">
              <Input
                className="text-base"
                placeholder="Digite o código"
                type={hidePassword ? 'password' : 'text'}
                pattern="\d*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setProfile({ ...profile, pwd: e.target.value })
                }}
              />
              <button
                className="absolute right-0 top-0 flex h-fit w-fit items-center gap-2 bg-transparent p-2 transition-all duration-300 ease-in-out"
                onClick={() => {
                  setHidePassword(!hidePassword)
                }}
              >
                {hidePassword ? (
                  <IconEyeHide
                    size={24}
                    className="mr-2 fill-primary-default transition-all duration-300 ease-in-out hover:fill-primary-default/50"
                  />
                ) : (
                  <IconEyeReveal
                    size={24}
                    className="mr-2 fill-primary-default transition-all duration-300 ease-in-out hover:fill-primary-default/50"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <ButtonNext
              title="Prosseguir"
              disabled={profile.pwd.length < 6}
              loading={updateLoad}
              func={() => update()}
            />
          </div>
        </>
      )}
    </article>
  )
}

export default ModalProfile
