import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { IconType } from '@/types/iconType'
import React from 'react'

interface ButtonAtlasProps {
  title: string
  classButton?: string
  classDiv?: string
  icon?: React.FC<IconType>
  sizeIcon?: number
  click?: () => void
  listAction?: {
    icon: React.FC<IconType>
    tooltip: string
    func: () => void
  }[]
}

const ButtonAtlas: React.FC<ButtonAtlasProps> = ({
  title,
  classButton,
  classDiv,
  icon: Icon,
  sizeIcon = 18,
  click,
  listAction
}) => {
  return (
    <div
      className={cn(
        'flex w-fit cursor-pointer items-center gap-2 rounded-md bg-primary-default fill-system-neutro px-3 py-2 text-sm text-system-neutro transition-transform duration-300 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-system-cinza/50',
        classButton,
        listAction ? 'justify-between' : ''
      )}
      onClick={click}
    >
      <div className={cn('flex items-center justify-start gap-3 text-sm', classDiv)}>
        {Icon && <Icon size={sizeIcon} />}
        {title}
      </div>
      {listAction && (
        <div className="flex justify-center gap-2">
          {listAction.map(({ icon: Icon, tooltip, func }, number) => (
            <TooltipProvider key={number}>
              <Tooltip>
                <TooltipTrigger onClick={func}>
                  <Icon
                    size={20}
                    className="fill-primary-default transition-transform duration-300 hover:fill-secondary-default"
                  />
                </TooltipTrigger>
                <TooltipContent className="rounded-md bg-primary-default p-2 text-sm font-normal text-white">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </div>
  )
}

export default ButtonAtlas
