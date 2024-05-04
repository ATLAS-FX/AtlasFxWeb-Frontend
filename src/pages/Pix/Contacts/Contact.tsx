import { IconTrash } from '@/components/icons/Trash'
import { IconUser } from '@/components/icons/User'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Dispatch, SetStateAction } from 'react'

interface IContact {
  name: string
  openModal: Dispatch<SetStateAction<boolean>>
  step: Dispatch<SetStateAction<number>>
}

const Contact: React.FC<IContact> = ({ name, openModal, step }) => {
  return (
    <div className="flex items-center justify-between border-b-2 border-colorPrimary-500 py-2 ">
      <Button
        className="flex cursor-pointer items-center gap-2 fill-colorPrimary-500 text-lg font-semibold text-colorPrimary-500 hover:fill-colorSecondary-500 hover:text-colorSecondary-500"
        onClick={() => step(1)}
        variant="ghost"
      >
        <IconUser size={24} />
        {name}
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => openModal(true)}>
            <IconTrash
              size={24}
              className="fill-colorPrimary-500 hover:fill-colorSecondary-500"
            />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
            clique para deletar contato
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Contact
