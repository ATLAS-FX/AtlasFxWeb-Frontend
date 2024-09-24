import { ButtonNext, Title } from '@/components/layout'
import { Input } from '@/components/ui/input'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

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
  return (
    <article className="flex flex-col gap-2">
      <Title
        title={'Alterar Dados'}
        back={
          profile.step > 0
            ? () => setProfile({ ...profile, step: profile.step - 1 })
            : () => {}
        }
      />
      {profile.step === 0 && (
        <>
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
        </>
      )}
      {profile.step === 1 && (
        <div className="flex flex-col gap-1">
          <label htmlFor="">Insira o código recebido em seu e-mail:</label>
          <Input
            type="text"
            value={profile.pwd}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setProfile({ ...profile, pwd: e.target.value })
            }}
          />
          <div className="mt-2 flex justify-end">
            <ButtonNext
              title="Prosseguir"
              disabled={!profile.pwd}
              loading={updateLoad}
              func={() => update()}
            />
          </div>
        </div>
      )}
    </article>
  )
}

export default ModalProfile
