import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

interface ModalDeleteProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  title?: string
  body: ReactNode
  ArrayButton: ReactNode
}

export const ModalDefault: React.FC<ModalDeleteProps> = ({
  openModal,
  setOpenModal,
  title,
  body,
  ArrayButton
}) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent className="min-w-96 max-w-96 gap-4 rounded-xl bg-white sm:max-w-56">
        {title && (
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="m-auto text-center text-xl">{title}</DialogTitle>
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
