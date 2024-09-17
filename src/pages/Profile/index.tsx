import {
  IconCopyPaste,
  IconExclamation,
  IconPadLock,
  IconQuestion,
  IconRegistration
} from '@/components/icons'
import { ButtonAtlas, Container, Title } from '@/components/layout'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { getProfile } from '@/services/UserApi'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const listLinks = [
  {
    title: 'Dados cadastrais',
    icon: IconRegistration,
    path: '/profile/registration'
  },
  {
    title: 'Alterar minha senha',
    icon: IconPadLock,
    path: '/profile/password'
  },
  {
    title: 'Dúvidas Frequentes',
    icon: IconQuestion,
    path: '/profile/faq-asked'
  },
  {
    title: 'Encerrar minha conta',
    icon: IconExclamation,
    path: '/profile/close-account'
  }
]

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { data: profile, isLoading, isError } = getProfile()

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <Container>
      <Title
        title="Meu Perfil"
        subtitle="Gerencie seu perfil"
        back={() => navigate(-1)}
      />
      {isLoading ? (
        <Skeleton className="h-2/5 w-full rounded-lg" />
      ) : (
        <>
          <div className="flex flex-col gap-2 px-2">
            <h2 className="text-lg font-semibold text-primary-default">
              {profile?.name}
            </h2>
            <p className="flex items-center gap-4 text-sm text-system-cinza">
              <span>Agência: {profile?.agency}</span>
              <span className="text-lg">•</span>
              <span>Conta: {profile?.account}</span>
              <span className="text-lg">•</span>
              <span>Banco: {profile?.bank}</span>
            </p>
            <div
              className="flex cursor-pointer items-center gap-2 fill-primary-default font-medium text-primary-default transition-all duration-200 ease-in-out hover:fill-primary-hover hover:text-primary-hover"
              onClick={() =>
                handleCopyClick(
                  `Agência: ${profile?.agency} • Conta: ${profile?.account} • Banco: ${profile?.bank}`,
                  'Dados copiado sucesso',
                  'Falha ao copiar dados da conta'
                )
              }
            >
              <IconCopyPaste className="size-4" />
              Copiar dados da conta
            </div>
          </div>
          <Separator className="h-0.5 w-full bg-system-cinza/25" />
          {listLinks.map(({ title, icon: Icon, path }, number) => (
            <ButtonAtlas
              key={number}
              title={title}
              icon={Icon}
              click={() => navigate(path)}
            />
          ))}
        </>
      )}
      <div className="absolute bottom-2 left-2 flex flex-col gap-2">
        <Link
          className="text-sm text-primary-default transition-all duration-200 ease-in-out hover:scale-105 hover:text-primary-hover"
          to={''}
        >
          Termos de uso
        </Link>
        <Link
          className="text-sm text-primary-default transition-all duration-200 ease-in-out hover:scale-105 hover:text-primary-hover"
          to={''}
        >
          Política de privacidade
        </Link>
      </div>
    </Container>
  )
}

export default Profile
