import { cn } from '@/lib/utils'
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
  icon: React.FC<App.IconProps>
  sizeIcon?: number
  click?: () => void
  listAction?: {
    icon: React.FC<App.IconProps>
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
    <button
      onClick={click}
      className={cn(
        'flex w-full items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-medium text-colorPrimary-500 transition-transform duration-300 ',
        classButton,
        listAction
          ? 'justify-between'
          : 'hover:bg-colorPrimary-500 hover:fill-white hover:text-white'
      )}
    >
      <div className={cn('flex items-center justify-start gap-2', classDiv)}>
        <Icon size={sizeIcon} />
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
    </button>
  )
}
