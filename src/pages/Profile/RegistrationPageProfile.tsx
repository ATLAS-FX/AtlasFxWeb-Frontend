import { IconEditPen } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { updateAddress } from '@/services/UserApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { UserType } from '@/types/userType'
import md5 from 'md5'
import { useState } from 'react'
import ModalProfile from './ModalProfile'

interface RegistrationProps {
  data: UserType | null
  refreshData: () => void
}

const RegistrationPageProfile: React.FC<RegistrationProps> = ({
  data,
  refreshData
}) => {
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
        pwd: md5(profile.pwd)
      },
      {
        onSuccess: (res: any) => {
          if (res.status === 'ok') {
            setProfile({ ...profile, modal: false })
            refreshData()
          }
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
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
          <p>{`${data?.street} ${data?.st_number ? ',' : ''} ${data?.st_number ?? ''} - ${data?.district}, ${data?.city} - ${data?.zip}`}</p>
        </div>
        <div className="flex justify-end">
          <Button
            className="flex items-center gap-3 border-none bg-transparent fill-primary-default text-primary-default shadow-none transition-all duration-300 ease-in-out hover:fill-white hover:text-white"
            onClick={() => setProfile({ ...profile, modal: true })}
          >
            Editar
            <IconEditPen className="size-4" />
          </Button>
        </div>
      </section>

      <Dialog
        open={profile.modal}
        onOpenChange={() => setProfile({ ...profile, modal: false })}
      >
        <DialogContent
          className={cn(
            'h-[622px] w-[672px] gap-4 overflow-y-scroll rounded-xl bg-white',
            profile.step >= 1 && 'h-[268px]'
          )}
        >
          <ModalProfile
            profile={profile}
            setProfile={setProfile}
            updateLoad={loadUpdate}
            update={handleUpade}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RegistrationPageProfile
