import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  question: string
  contain?: React.ReactNode
  cancelFunc?: () => void
  handleFunc?: () => void
  back: () => void
  loading?: boolean
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  question,
  contain,
  cancelFunc,
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
        <h4 className="text-base font-semibold text-primary-default">{title}</h4>
      </div>
      {question && (
        <h4 className="text-center text-base font-medium text-system-cinza">
          {question}
        </h4>
      )}
      {contain}
      {handleFunc && (
        <div className="mt-4 flex items-center justify-around">
          {cancelFunc && <ButtonNext title="Cancelar" func={cancelFunc} />}
          <ButtonNext
            title="Excluir"
            func={handleFunc}
            loading={loading}
            classPlus="bg-[#EF4444] hover:bg-[#aa2727]"
          />
        </div>
      )}
    </section>
  )
}

export default ModalConfirm