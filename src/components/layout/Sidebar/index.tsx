import Atlas_Logo from '@/assets/logos/AtlasFX_Logo2.svg'
import CarteiraX_Logo from '@/assets/logos/Carteira_X _Logo2.svg'
import { IconLogout, IconUser } from '@/components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { checkoutItems } from './checkoutItems'

const Sidebar: React.FC = () => {
  const { pathname } = useLocation()
  const { signOut, themeSystem } = useAtlas()
  const navigate = useNavigate()
  return (
    <nav className="flex h-[calc(100dvh-80px)] flex-col justify-between gap-2 rounded-2xl bg-primary-default px-2 py-6">
      <div className="flex w-full items-center justify-center">
        <img
          className="w-28"
          src={themeSystem.systemName === 'Atlas FX' ? Atlas_Logo : CarteiraX_Logo}
          alt={`logo ${themeSystem.systemName}`}
        />
      </div>
      <div className="flex flex-col gap-2">
        {checkoutItems.map(({ path, title }, number) => (
          <Link
            key={number}
            className={cn(
              'w-full rounded-lg p-2 px-6 text-base text-[#EFEFEF80] transition-all duration-200 ease-in-out hover:bg-[#efefef3f] hover:text-white focus:outline-none focus:ring-2 focus:ring-system-cinza/50',
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
      <div className="flex justify-around">
        <TooltipProvider key={'logout'}>
          <Tooltip>
            <TooltipTrigger
              className="flex size-5 items-center fill-[#EF4444] transition-all duration-200 ease-in-out hover:opacity-90"
              onClick={signOut}
            >
              <IconLogout />
            </TooltipTrigger>
            <TooltipContent>
              <p className="rounded-md text-sm font-normal text-white">Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={'perfil'}>
          <Tooltip>
            <TooltipTrigger
              className="flex size-5 items-center rounded-full fill-[#EFEFEF80] transition-all duration-200 ease-in-out"
              onClick={() => navigate('profile')}
            >
              <IconUser />
            </TooltipTrigger>
            <TooltipContent>
              <p className="rounded-md text-sm font-normal text-white">Meu Perfil</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  )
}

export default Sidebar
