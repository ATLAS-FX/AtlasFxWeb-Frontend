import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface ToastLoginProps {
  title: string
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ToastLogin: React.FC<ToastLoginProps> = ({
  openModal,
  setOpenModal,
  title
}) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent className="h-72 w-72 gap-4 rounded-xl bg-white" isFalseClose>
        <DialogTitle className="m-auto text-center text-xl">{title}</DialogTitle>
        <div className="flex items-center justify-center">
          <LoaderCircle className="h-48 w-48 animate-spin text-primary-default transition-transform" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ToastLogin
