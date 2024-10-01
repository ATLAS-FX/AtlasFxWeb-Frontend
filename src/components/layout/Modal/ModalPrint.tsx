import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

interface ModalPrintProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  title?: string
  body: ReactNode
  ArrayButton: ReactNode
}

const ModalPrint: React.FC<ModalPrintProps> = ({
  openModal,
  setOpenModal,
  title,
  body,
  ArrayButton
}) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent className="max-h-[620px] max-w-[920px] gap-4 overflow-auto rounded-xl bg-white p-0 sm:max-w-56">
        <DialogTitle className="text-base font-semibold text-primary-default">
          {title}
        </DialogTitle>
        <DialogDescription>{''}</DialogDescription>
        {body}
        <DialogFooter>
          <div className="flex w-full justify-end gap-4">{ArrayButton}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalPrint
