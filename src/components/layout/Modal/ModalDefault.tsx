import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

interface ModalDeleteProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  classPlus?: string
  title?: string
  body: ReactNode
  ArrayButton: ReactNode
}

const ModalDefault: React.FC<ModalDeleteProps> = ({
  openModal,
  setOpenModal,
  classPlus,
  title,
  body,
  ArrayButton
}) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent
        className={cn('min-w-96 max-w-96 gap-4 rounded-xl bg-white', classPlus)}
      >
        {title && (
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-start text-base text-primary-default">
              {title}
            </DialogTitle>
            <DialogDescription>{''}</DialogDescription>
          </DialogHeader>
        )}
        {body}
        <DialogFooter>
          <div className="flex w-full justify-end gap-4">{ArrayButton}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalDefault
