import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ItemProps {
  icon: React.FC<App.IconProps>
  path: string
  title: string
  exit: boolean
}

export const BaseBoard: React.FC<ItemProps> = ({ icon: Icon, path, title }) => {
  const { pathname } = useLocation()
  console.log(pathname)

  return (
    <li className="flex flex-col items-center justify-center">
      <Link
        className={cn(
          'flex h-14 w-16 flex-col items-center justify-center gap-1 rounded-xl border-2 border-white fill-white text-center text-[9px] font-bold text-white transition-all ease-in-out hover:bg-white hover:fill-colorPrimary-500 hover:text-colorPrimary-500 xl:h-12 xl:w-12',
          pathname === path && 'bg-colorSecondary-500'
        )}
        to={path}
      >
        <Icon size={24} stroke={2} />
        <span>{title}</span>
      </Link>
    </li>
  )
}
