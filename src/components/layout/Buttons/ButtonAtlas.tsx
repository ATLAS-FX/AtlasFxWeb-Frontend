import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { IconType } from '@/types/iconType'
import { ChevronRight } from 'lucide-react'
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
  sizeIcon = 20,
  click,
  listAction
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl fill-primary-default p-2 text-base font-medium text-primary-default transition-transform duration-300',
        classButton,
        listAction ? 'justify-between' : ''
      )}
    >
      <div className={cn('flex items-center justify-start gap-3 text-lg', classDiv)}>
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
      <ChevronRight
        onClick={click}
        className="cursor-pointer text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:rounded-full hover:bg-primary-hover hover:text-white"
        size={24}
      />
    </div>
  )
}

export default ButtonAtlas
