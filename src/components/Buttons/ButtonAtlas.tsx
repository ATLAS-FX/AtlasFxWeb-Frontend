import { cn } from '@/lib/utils'
import { IconType } from '@/types/iconType'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

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

export const ButtonAtlas: React.FC<ButtonAtlasProps> = ({
  title,
  classButton,
  classDiv,
  icon: Icon,
  sizeIcon = 30,
  click,
  listAction
}) => {
  return (
    <div
      onClick={click}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-medium text-colorPrimary-500 shadow-md shadow-slate-400 drop-shadow-md transition-transform duration-300',
        classButton,
        listAction
          ? 'justify-between'
          : 'hover:bg-colorPrimary-500 hover:fill-white hover:text-white'
      )}
    >
      <div className={cn('flex items-center justify-start gap-2', classDiv)}>
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
                    className="fill-colorPrimary-500 transition-transform duration-300 hover:fill-colorSecondary-500"
                  />
                </TooltipTrigger>
                <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
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
