import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface ModalContactProps {
  state: {
    step: number
    stateModal: boolean
    idContact: string
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      stateModal: boolean
      idContact: string
    }>
  >
  funcDelete: () => void
  loadDelete: boolean
}

const ModalContact: React.FC<ModalContactProps> = ({
  state,
  setState,
  funcDelete,
  loadDelete
}) => {
  return (
    <Dialog
      open={state.stateModal}
      onOpenChange={() => setState({ ...state, stateModal: false })}
    >
      <DialogContent
        className={cn(
          'h-fit gap-4 rounded-xl bg-white py-4',
          state.step >= 1 ? 'w-[372px]' : 'w-[348px]'
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle>{''}</DialogTitle>
          <DialogDescription>{''}</DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-2 text-system-cinza">
          <div className="flex items-center gap-2">
            <Button
              className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
              variant="ghost"
              onClick={() =>
                setState({ ...state, step: state.step >= 1 ? state.step - 1 : 0 })
              }
            >
              <ChevronLeft size={18} />
            </Button>
            <h4 className="text-base font-semibold text-primary-default">
              Excluir contato?
            </h4>
          </div>
          <h4 className="text-center text-sm font-medium text-system-cinza">
            Você tem certeza que deseja excluir esse contato?
          </h4>
          <div className="mt-4 flex items-center justify-around">
            <ButtonNext
              title="Cancelar"
              func={() => setState({ ...state, stateModal: false })}
            />
            <ButtonNext
              title="Excluir"
              func={funcDelete}
              loading={loadDelete}
              classPlus="bg-[#EF4444] hover:bg-[#aa2727]"
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default ModalContact
