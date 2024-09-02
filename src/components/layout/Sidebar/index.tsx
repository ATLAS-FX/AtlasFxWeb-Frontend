import Atlas_Logo from '@/assets/atlas_logo.svg'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkoutItems } from './checkoutItems'

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <nav className="flex h-full flex-col justify-between gap-2 rounded-2xl bg-[#243060] px-2 py-6">
      <div className="flex w-full items-center justify-center">
        <img className="w-28" src={Atlas_Logo} alt="logo atlas_fx" />
      </div>
      <div className="flex flex-col gap-2">
        {checkoutItems.map(({ path, title }) => (
          <Link
            className={cn(
              'w-full rounded-lg p-2 text-[#EFEFEF80] transition-all duration-200 ease-in-out',
              pathname.includes(path)
                ? 'pointer-events-none bg-[#384578] text-white'
                : 'bg-transparent'
            )}
            to={path}
          >
            {title}
          </Link>
        ))}
      </div>
      <div></div>
    </nav>
  )
}
