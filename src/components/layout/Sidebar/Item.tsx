import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ItemProps {
  icon: React.FC<App.IconProps>
  path: string
  title: string
  active: boolean
  comming: boolean
}

export const Item: React.FC<ItemProps> = ({
  icon: Icon,
  path,
  title,
  active,
  comming
}) => {
  const { pathname } = useLocation()

  return (
    <li className="flex flex-col items-center justify-center">
      <Link
        className={cn(
          'flex h-fit w-[72px] flex-col items-center justify-center gap-1 rounded-lg border-2 border-colorPrimary-500 fill-colorPrimary-500 py-2 text-center text-[9px] font-bold text-colorPrimary-500 transition-all ease-in-out hover:bg-colorPrimary-500 hover:fill-colorSecondary-500 hover:text-colorSecondary-500 xl:h-[56px] xl:w-[64px] xl:text-[8px]',
          pathname === path ? 'bg-colorTheme-10 pointer-events-none' : 'bg-transparent',
          comming &&
            'border-[#C8D753] bg-[#C8D753] text-colorPrimary-500 shadow-shadowP',
          !active && 'pointer-events-none cursor-not-allowed'
          // active
          //   ? pathname === path
          //     ? 'fill-[#000]'
          //     : 'fill-colorPrimary-500 hover:fill-white'
          //   : 'fill-[#D9DDE9]'
        )}
        to={path}
      >
        <Icon className="w-5" />
        <span>{title}</span>
      </Link>
    </li>
  )
}
