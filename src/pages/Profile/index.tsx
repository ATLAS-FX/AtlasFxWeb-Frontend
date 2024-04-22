import { IconClose } from '@/components/icons/Close'
import { IconPadLock } from '@/components/icons/PadLock'
import { IconRegistration } from '@/components/icons/Registration'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'

const listLinks = [
  {
    title: 'Dados cadastrais',
    icon: IconRegistration,
    path: '/profile/registration'
  },
  {
    title: 'Alterar senha',
    icon: IconPadLock,
    path: '/'
  },
  {
    title: 'Encerrar minha conta',
    icon: IconClose,
    path: '/'
  }
]

const Profile: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AdminContainer>
      <Title text="Meu Perfil" back={() => navigate(-1)} />
      {listLinks.map(({ title, icon: Icon, path }, number) => (
        <Link
          key={number}
          to={path}
          className="flex w-full items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-medium text-colorPrimary-500"
        >
          <Icon size={30} />
          {title}
        </Link>
      ))}
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
    </AdminContainer>
  )
}

export default Profile
