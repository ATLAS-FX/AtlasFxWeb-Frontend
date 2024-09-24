import { IconEditPen } from '@/components/icons'
import { ModalDefault } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { updateAddress } from '@/services/UserApi'
import { UserType } from '@/types/userType'
import { useState } from 'react'
import ModalProfile from './ModalProfile'

interface RegistrationProps {
  data: UserType | null
  refreshData: () => void
}

const Registration: React.FC<RegistrationProps> = ({ data, refreshData }) => {
  const [profile, setProfile] = useState<{
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
  }>({
    step: 0,
    modal: false,
    zip: '',
    street: '',
    st_number: '',
    st_comp: '',
    state: '',
    district: '',
    city: '',
    pwd: ''
  })
  const { mutate: update, isLoading: loadUpdate } = updateAddress()
  // const { mutate: checkCode, isLoading: loadCheck } = checkAddressCode()

  const handleUpade = async () => {
    update(
      {
        code: profile.pwd,
        zip: profile.zip,
        street: profile.street,
        state: profile.state,
        st_comp: profile.st_comp,
        st_number: profile.st_number,
        district: profile.district,
        city: profile.city,
        uf: profile.state,
        pwd: profile.pwd
      },
      {
        onSuccess: (res: any) => {
          if (res.status === 'ok') {
            setProfile({ ...profile, modal: false })
            refreshData()
          }
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e?.message || '',
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  return (
    <>
      <section className="flex flex-col gap-2 text-sm text-system-cinza">
        <h3 className="text-base font-semibold text-primary-default">
          Dados cadastrais
        </h3>
        <div className="flex flex-col gap-1">
          <p className="text-primary-default">Nome da empresa</p>
          <p>{data?.name}</p>
        </div>
        <Separator className="h-0.5 w-full bg-system-cinza/25" />
        <div className="flex flex-col gap-1">
          <p className="text-primary-default">E-mail</p>
          <p>{data?.email}</p>
        </div>
        <Separator className="h-0.5 w-full bg-system-cinza/25" />
        <div className="flex flex-col gap-1">
          <p className="text-primary-default">Telefone</p>
          <p>{data?.number ? data?.number : '--'}</p>
        </div>
        <Separator className="h-0.5 w-full bg-system-cinza/25" />
        <div className="flex flex-col gap-1">
          <p className="text-primary-default">Endereço</p>
          <p>{`${data?.street} ${data?.st_number ? ',' : ''} ${data?.st_number} - ${data?.district}, ${data?.city} - ${data?.zip}`}</p>
        </div>
        <div className="flex justify-end">
          <Button
            className="flex items-center gap-3 border-none bg-transparent fill-primary-default text-primary-default shadow-none transition-all duration-300 ease-in-out hover:scale-110 hover:fill-white hover:text-white"
            onClick={() => setProfile({ ...profile, modal: true })}
          >
            Editar
            <IconEditPen className="size-4" />
          </Button>
        </div>
      </section>
      <ModalDefault
        openModal={profile.modal}
        setOpenModal={() => setProfile({ ...profile, modal: false })}
        body={
          <>
            <ModalProfile
              profile={profile}
              setProfile={setProfile}
              updateLoad={loadUpdate}
              update={handleUpade}
            />
          </>
        }
        ArrayButton={null}
      />
    </>
  )
}

export default Registration
