import { IconTrash, IconUser } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { ErrorResponse } from '@/types/ErrorResponse'
import { Dispatch, SetStateAction } from 'react'

interface IContact {
  name: string
  keyPix: string
  openModal: Dispatch<SetStateAction<boolean>>
}

const Contact: React.FC<IContact> = ({ name, keyPix, openModal }) => {
  const handleCopyClick = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({
          variant: 'success',
          title: 'Chave copiada com sucesso',
          description: ''
        })
      })
      .catch(({ response }: ErrorResponse) => {
        toast({
          variant: 'destructive',
          title: response?.data?.error,
          description: 'repita o processo.'
        })
      })
  }

  return (
    <div className="flex items-center justify-between border-b-2 border-primary-default py-2 ">
      <Button
        className="flex cursor-pointer items-center gap-2 fill-primary-default text-lg font-semibold text-primary-default hover:fill-secondary-default hover:text-secondary-default"
        onClick={() => handleCopyClick(keyPix)}
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
              className="fill-primary-default hover:fill-secondary-default"
            />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-primary-default p-2 text-sm font-normal text-white">
            clique para deletar contato
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Contact
