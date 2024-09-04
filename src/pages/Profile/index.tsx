import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconClose, IconPadLock, IconRegistration } from '@/components/icons'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'

const listLinks = [
  {
    title: 'Dados cadastrais',
    icon: IconRegistration,
    path: '/profile/registration'
  },
  {
    title: 'Alterar senha',
    icon: IconPadLock,
    path: '/profile/password'
  },
  {
    title: 'Encerrar minha conta',
    icon: IconClose,
    path: '/profile/close-account'
  }
]

const Profile: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AdminContainer>
      <Title text="Meu Perfil" back={() => navigate(-1)} />
      {listLinks.map(({ title, icon: Icon, path }, number) => (
        <ButtonAtlas
          key={number}
          title={title}
          icon={Icon}
          click={() => navigate(path)}
        />
      ))}
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
    </AdminContainer>
  )
}

export default Profile
