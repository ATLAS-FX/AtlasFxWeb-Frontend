import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  contain: React.ReactNode
  handleFunc?: () => void
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  contain,
  handleFunc,
  back
}) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <MoveLeft size={18} />
        </Button>
        <h4 className="text-base font-semibold text-primary-default">{title}</h4>
      </div>
      {contain}
      {handleFunc && (
        <div className="mt-4 flex items-center justify-end">
          <ButtonNext title="Prosseguir" func={handleFunc} />
        </div>
      )}
    </section>
  )
}

export default ModalConfirm
