import { IconBuilding } from '@/components/icons/Building'
import { IconEmailSquare } from '@/components/icons/EmailSquare'
import { IconSmartphone } from '@/components/icons/Smartphone'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import PixApi from '@/services/PixApi'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const PixKeys: React.FC = () => {
  const navigate = useNavigate()

  const { data: listMyKeys } = useQuery({
    queryKey: 'list-pix-keys',
    queryFn: async () => {
      const res = await PixApi.listPixKeys()
      return res
    }
  })

  console.log(listMyKeys)

  const listPixActions = [
    {
      title: 'CNPJ',
      icon: IconBuilding
    },
    {
      title: 'Celular',
      icon: IconSmartphone
    },
    {
      title: 'E-mail',
      icon: IconEmailSquare
    }
  ]

  return (
    <AdminContainer>
      <Title text="Minhas Chaves Pix" back={() => navigate(-1)} />
      <label className="text-base font-medium">Nova chave pix</label>
      <Input
        className={cn(
          'h-12 rounded-xl border-2  border-colorPrimary-500 p-2 text-lg font-normal text-colorPrimary-500 shadow-none'
          // stepPix > 0 ? 'border-[#008000]' : 'border-colorPrimary-500'
        )}
        type="text"
        placeholder="+ Cadastrar nova chave"
      />
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <div>
        <label className="text-base font-medium">Gerencie suas chaves Pix</label>
        <div className="flex flex-col gap-2">
          {listPixActions.map(({ title, icon: Icon }, number) => (
            <div
              key={number}
              className="flex items-center justify-between gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-bold text-colorPrimary-500"
            >
              <div className="flex items-center gap-2">
                <Icon size={32} />
                {title}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost">copy</Button>
                <Button variant="ghost">share</Button>
                <Button variant="ghost">delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminContainer>
  )
}

export default PixKeys
