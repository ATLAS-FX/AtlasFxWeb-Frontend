import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  contain: React.ReactNode
  handleFunc?: () => void
  back: () => void
  loading?: boolean
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  contain,
  handleFunc,
  back,
  loading = false
}) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
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
      {contain}
      {handleFunc && (
        <div className="mt-4 flex items-center justify-end">
          <ButtonNext title="Prosseguir" func={handleFunc} loading={loading} />
        </div>
      )}
    </section>
  )
}

export default ModalConfirm
