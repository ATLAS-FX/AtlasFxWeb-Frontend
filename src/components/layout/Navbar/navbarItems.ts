import { IconExit } from '@/components/icons/Exit'
import { IconSupport } from '@/components/icons/Support'
import { IconUserCircle } from '@/components/icons/UserCircle'

export const navbarItems = [
  {
    id: 1,
    title: 'Meu Perfil',
    icon: IconUserCircle,
    path: '/profile',
    exit: false
  },
  {
    id: 2,
    title: 'Suporte',
    icon: IconSupport,
    path: '/extract',
    exit: false
  },
  {
    id: 3,
    title: 'Sair',
    icon: IconExit,
    path: '',
    exit: true
  }
]
