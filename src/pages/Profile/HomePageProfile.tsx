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
import { useAtlas } from '@/contexts/AtlasContext'
import { getProfile } from '@/services/UserApi'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClosedPageProfile from './ClosedPageProfile'
import PasswordPageProfile from './PasswordPageProfile'
import QuestionsPageProfile from './QuestionsPageProfile'
import RegistrationPageProfile from './RegistrationPageProfile'

const listLinks = [
  {
    title: 'Dados cadastrais',
    icon: IconRegistration,
    flow: 1
  },
  {
    title: 'Alterar minha senha',
    icon: IconPadLock,
    flow: 2
  },
  {
    title: 'Dúvidas Frequentes',
    icon: IconQuestion,
    flow: 3
  },
  {
    title: 'Encerrar minha conta',
    icon: IconExclamation,
    flow: 4
  }
]

const HomePageProfile: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAtlas()
  const { data: profile, isLoading, refetch } = getProfile()
  const [step, setStep] = useState<number>(0)

  useEffect(() => {
    if (profile) {
      setUser((prev) => ({ ...prev, ...profile }))
    }
  }, [profile])

  return (
    <Container>
      <Title
        title="Perfil"
        subtitle="Gerencie seu perfil"
        back={() => {
          step === 0 ? navigate(-1) : setStep(0)
        }}
      />
      {isLoading ? (
        <Skeleton className="h-2/5 w-full rounded-lg" />
      ) : (
        <>
          {step === 0 && (
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
              <div className="flex flex-col gap-1">
                {listLinks.map(({ title, icon: Icon, flow }, number) => (
                  <ButtonAtlas
                    classButton="bg-transparent text-primary-default fill-primary-default hover:bg-primary-default hover:text-white hover:fill-white"
                    key={number}
                    title={title}
                    icon={Icon}
                    click={() => setStep(flow)}
                  />
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <RegistrationPageProfile
              refreshData={refetch}
              data={profile ? profile : null}
            />
          )}
          {step === 2 && <PasswordPageProfile />}
          {step === 3 && <QuestionsPageProfile />}
          {step === 4 && <ClosedPageProfile />}
        </>
      )}
      {step === 0 && (
        <div className="absolute bottom-2 left-2 flex flex-col gap-2">
          <Link
            className="text-sm text-primary-default transition-all duration-200 ease-in-out hover:text-primary-hover hover:underline"
            to={''}
          >
            Termos de uso
          </Link>
          <Link
            className="text-sm text-primary-default transition-all duration-200 ease-in-out hover:text-primary-hover hover:underline"
            to={''}
          >
            Política de privacidade
          </Link>
        </div>
      )}
    </Container>
  )
}

export default HomePageProfile
