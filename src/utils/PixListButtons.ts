import { IconBuilding } from '@/components/icons/Building'
import { IconCoding } from '@/components/icons/Coding'
import { IconCopyPaste } from '@/components/icons/CopyPaste'
import { IconEmailSquare } from '@/components/icons/EmailSquare'
import { IconSmartphone } from '@/components/icons/Smartphone'
import { IconUserSquare } from '@/components/icons/UserSquare'

export const listPixButton: {
  icon: React.FC<App.IconProps>
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
