import { Container, Title } from '@/components/layout'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { getProfile } from '@/services/UserApi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CloseAccount: React.FC = () => {
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
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <Container>
          <Title title="Encerrar Conta" back={() => navigate(-1)} />
          <div className="flex flex-col gap-2 text-justify text-sm font-normal">
            <h4 className="text-lg font-semibold text-shadow-3x">
              Para Encerrar sua conta,
            </h4>
            <p>Para solicitar o encerramento de sua conta, lembre-se: </p>
            <p>
              <label className="font-semibold">Solicitação por E-mail: </label>O
              pedido de cancelamento deve ser feito exclusivamente por e-mail. Por
              favor, envie sua solicitação para{' '}
              <label className="font-semibold">{profile?.emailWhite}</label>
            </p>
            <p>
              É obrigatório que o e-mail de solicitação seja enviado a partir do
              endereço de e-mail cadastrado em sua conta. Isso ajuda a verificar sua
              identidade e proteger contra tentativas de fraude.
            </p>
            <p>
              <label className="font-semibold">
                Verificação de Saldo e Transações:{' '}
              </label>
              Antes de solicitar o encerramento, certifique-se de verificar seu saldo
              e garantir que não haja transações pendentes ou débitos automáticos
              ativos em sua conta.
            </p>
            <p>
              <label className="font-semibold">Atualização de Dados: </label> Se
              houve mudanças em suas informações de contato ou outras informações
              relevantes desde a abertura da conta, por favor, atualize-as conosco
              para garantir uma comunicação adequada.
            </p>
            <p>
              <label className="font-semibold">
                Acompanhamento da Solicitação:{' '}
              </label>
              Após enviar o e-mail de solicitação, acompanhe regularmente sua caixa
              de entrada para possíveis atualizações ou solicitações adicionais por
              parte de nossa equipe.
            </p>
            <p>
              Agradecemos sua atenção e cooperação neste processo. Estamos
              comprometidos em garantir que seu encerramento de conta seja tratado
              com a máxima segurança e eficiência.
            </p>
          </div>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-secondary-default" />
          </div>
        </Container>
      )}
    </>
  )
}

export default CloseAccount