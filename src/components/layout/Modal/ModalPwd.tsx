import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MoveLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  subtitle: string
  token: (value: string) => void
  handleFunc: () => void
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  subtitle,
  token,
  handleFunc,
  back
}) => {
  return (
    <section>
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
      <h5 className="text-sm ">{subtitle}</h5>
      <div>
        <label className="w-fit bg-system-neutro text-system-cinza">Senha</label>
        <Input
          placeholder="Digite o código de 6 dígitos"
          type="number"
          maxLength={6}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            token(e.target.value)
          }
        />
      </div>
      <ButtonNext
        title="Prosseguir"
        disabled={false}
        loading={false}
        func={() => handleFunc()}
      />
    </section>
  )
}
export default ModalConfirm
