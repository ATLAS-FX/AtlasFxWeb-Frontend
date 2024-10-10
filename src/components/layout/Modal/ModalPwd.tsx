import { IconEyeHide, IconEyeReveal } from '@/components/icons'
import { ButtonNext, InputFx } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface ModalConfirmProps {
  title: string
  subtitle: string
  token: string
  setToken: (value: string) => void
  handleFunc: () => void
  loading?: boolean
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  subtitle,
  token,
  setToken,
  handleFunc,
  loading,
  back
}) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <ChevronLeft size={18} />
        </Button>
        <DialogTitle className="text-base font-semibold text-primary-default">
          {title}
        </DialogTitle>
        <DialogDescription>{''}</DialogDescription>
      </div>
      <h5 className="text-sm">{subtitle}</h5>
      <div className="flex flex-col gap-2">
        <label className="w-fit text-sm text-system-cinza">Senha:</label>
        <div className="relative">
          <InputFx
            name={'modalpwd'}
            type={hidePassword ? 'password' : 'text'}
            label={'Digite o código'}
            bgLabel="bg-white"
            value={token}
            change={(e) => {
              setToken(e)
            }}
          />
          <button
            className="absolute right-0 top-1 flex h-fit w-fit items-center gap-2 bg-transparent p-2 transition-all duration-300 ease-in-out"
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
          disabled={token.length < 6}
          loading={loading}
          func={() => handleFunc()}
        />
      </div>
    </section>
  )
}
export default ModalConfirm
