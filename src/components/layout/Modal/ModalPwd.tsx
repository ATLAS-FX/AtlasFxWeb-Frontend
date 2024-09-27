import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MoveLeft } from 'lucide-react'
import { ChangeEvent } from 'react'

interface ModalConfirmProps {
  title: string
  subtitle: string
  token: (value: string) => void
  handleFunc: () => void
  loading?: boolean
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  subtitle,
  token,
  handleFunc,
  loading,
  back
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <MoveLeft size={18} />
        </Button>
        <h4 className="text-sm font-semibold text-primary-default">{title}</h4>
      </div>
      <h5 className="text-sm">{subtitle}</h5>
      <div className="flex flex-col gap-2">
        <label className="w-fit text-sm text-system-cinza">Senha:</label>
        <Input
          className="text-sm"
          placeholder="Digite o código de 6 dígitos"
          type="password"
          maxLength={6}
          pattern="\d*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            token(e.target.value)
          }}
        />
      </div>
      <div className="flex justify-end">
        <ButtonNext title="Prosseguir" loading={loading} func={() => handleFunc()} />
      </div>
    </section>
  )
}
export default ModalConfirm
