import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'

const PixDeposit: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AdminContainer>
      <Title text="Depositar" back={() => navigate(-1)} />
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
    </AdminContainer>
  )
}

export default PixDeposit
