import Robo_Triste from '@/assets/robo_triste.png'
import { CardHome } from '@/components/layout'

const ClosePageProfile: React.FC = () => {
  const StyleBot = {
    backgroundImage: `url('${Robo_Triste}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '85% 16px',
    backgroundSize: '142px'
  }

  return (
    <section className="flex flex-col gap-4 text-xs text-system-cinza">
      <CardHome
        classes="bg-primary-default"
        imgBG={StyleBot}
        children={
          <p className="ml-40 flex h-32 w-4/12 flex-col justify-center text-2xl font-semibold text-secondary-default xl:text-2xl">
            {'É uma pena que esteja nos deixando... :('}
          </p>
        }
      />
      <div className="m-auto flex w-[65%] flex-col gap-6">
        <h3 className="text-base font-semibold text-primary-default">
          Para solicitar o encerramento de sua conta, lembre-se:
        </h3>
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium text-primary-default">
            Solicitação por E-mail:
          </h5>
          <p>
            O pedido de cancelamento deve ser feito exclusivamente por e-mail. Por
            favor, envie sua solicitação para{' '}
            <strong>[e-mail da white label para encerramento]</strong>.
          </p>
          <p>
            É obrigatório que o e-mail de solicitação seja enviado a partir do
            endereço de e-mail cadastrado em sua conta. Isso ajuda a verificar sua
            identidade e proteger contra tentativas de fraude.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium text-primary-default">
            Verificação de Saldo e Transações:
          </h5>
          <p>
            Antes de solicitar o encerramento, certifique-se de verificar seu saldo e
            garantir que não haja transações pendentes ou débitos automáticos ativos
            em sua conta.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium text-primary-default">
            Atualização de Dados:
          </h5>
          <p>
            Se houve mudanças em suas informações de contato ou outras informações
            relevantes desde a abertura da conta, por favor, atualize-as conosco para
            garantir uma comunicação adequada.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium text-primary-default">
            Acompanhamento da Solicitação:
          </h5>
          <p>
            Após enviar o e-mail de solicitação, acompanhe regularmente sua caixa de
            entrada para possíveis atualizações ou solicitações adicionais por parte
            de nossa equipe.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ClosePageProfile
