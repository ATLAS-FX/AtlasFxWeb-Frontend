import {
  IconCopyPaste,
  IconDepositCoin,
  IconGroupUser,
  IconKey
} from '@/components/icons'
import { Container, Title } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'

const Pix: React.FC = () => {
  const navigate = useNavigate()

  const listPixActions = [
    {
      title: 'Minhas Chaves Pix',
      icon: IconKey,
      path: '/pix/my-keys'
    },
    {
      title: 'Meus Contatos Salvos',
      icon: IconGroupUser,
      path: '/pix/my-contacts'
    },
    {
      title: 'Depositar',
      icon: IconDepositCoin,
      path: '/deposits'
    }
  ]

  return (
    <Container>
      <Title
        title="Área Pix"
        subtitle="Envie seus PIX. Simples e rápido."
        back={() => navigate(-1)}
      />
      <div className="flex flex-col gap-4">
        <h4 className="text-sm text-system-cinza">Insira a chave pix:</h4>
        <Input
          type="text"
          placeholder="Digite a chave pix"
          className="w-full rounded-md border-[1px] border-system-cinza/25 p-6"
        />
        <div className="flex justify-end">
          <Button className="flex items-center gap-2 bg-primary-default fill-system-neutro px-4 py-6 text-system-neutro">
            <IconCopyPaste className="size-5" />
            Copia e cola
          </Button>
        </div>
      </div>
      <Separator className="my-4 h-0.5 w-full bg-system-cinza/25" />
      <Select>
        <SelectTrigger className="border-system-cinza/25 p-6">
          <SelectValue placeholder="Minhas chaves" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listPixActions.map(({ title, icon: Icon, path }, number) => (
              <SelectItem
                value={title}
                key={`button-${number}`}
                onClick={() => navigate(path)}
              >
                <label className="flex items-center gap-4 fill-primary-default text-lg text-primary-default">
                  <Icon className="size-6" />
                  {title}
                </label>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <h4 className="rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
        Contatos
      </h4>
    </Container>
  )
}

export default Pix
