import {
  IconBuilding,
  IconCoding,
  IconCopyPaste,
  IconEmailSquare,
  IconSmartphone,
  IconUserSquare
} from '@/components/icons'
import { IconType } from '@/types/iconType'

export const listPixButton: {
  icon: React.FC<IconType>
  name: string
  type: string
}[] = [
  {
    icon: IconUserSquare,
    name: 'CPF',
    type: 'cpf'
  },
  {
    icon: IconBuilding,
    name: 'CNPJ',
    type: 'cnpj'
  },
  {
    icon: IconSmartphone,
    name: 'Celular',
    type: 'cel'
  },
  {
    icon: IconEmailSquare,
    name: 'E-mail',
    type: 'email'
  },
  {
    icon: IconCoding,
    name: 'Chave aleatória',
    type: 'key-random'
  },
  {
    icon: IconCopyPaste,
    name: 'Copia e Cola',
    type: 'copy-paste'
  }
]
