import Shield from '@/assets/shield.svg'
import { Separator } from '@/components/ui/separator'

const Home: React.FC = () => {
  return (
    <div className="flex h-full flex-col gap-4 text-sm font-light text-white xl:text-xs">
      <h4 className="text-base font-semibold xl:text-sm">Seja bem-vindo!</h4>
      <p>
        Onde quer que você esteja, estamos aqui para simplificar suas finanças. Com
        nosso Portal PJ, você tem o poder de gerenciar as contas da sua empresa,
        pagar contas, transferir dinheiro e muito mais, tudo com facilidade e
        segurança.
      </p>
      <p>
        Explore nossos recursos intuitivos e aproveite a conveniência de realizar
        suas transações financeiras da forma que precisar.
      </p>
      <p>
        Junte-se a nós em nossa jornada para simplificar a vida financeira e
        experimente o futuro dos serviços bancários hoje mesmo.
      </p>
      <p>
        Estamos aqui para ajudar você a alcançar seus objetivos financeiros, cada
        passo do caminho.
      </p>
      <p>
        Sua segurança é nossa prioridade, e nossas medidas robustas garantem que suas
        informações permaneçam protegidas em cada transação.
      </p>
      <Separator className="m-auto mt-2 w-10/12 bg-colorSecondary-500" />
      <p className="m-auto w-8/12 text-justify">
        Sua segurança é nossa prioridade, e nossas medidas robustas garantem que suas
        informações permaneçam protegidas em cada transação.
      </p>
      <div className="flex flex-col justify-center gap-4">
        <h4 className="text-center text-xs font-medium">
          Maior Segurança para Contas PJ com Acesso Limitado por IP Fixo
        </h4>
        <div className="flex items-start justify-between gap-2">
          <img
            src={Shield}
            alt="imagem do escudo de segurança"
            className="object-contain"
          />
          <div className="flex flex-col items-start justify-between gap-2 text-xs">
            <p>
              <strong className="font-bold">
                Prevenção de Acesso Não Autorizado:{' '}
              </strong>
              Um endereço IP fixo restringe o acesso à conta bancária do cliente a um
              dispositivo específico ou rede confiável. Isso impede que hackers e
              outros agentes mal-intencionados acessem conta a partir de locais
              desconhecidos ou não autorizados.
            </p>
            <p>
              <strong className="font-bold">
                Mitigação de Ataques de Phishing e Pharming:{' '}
              </strong>
              Ter um IP fixo dificulta significativamente os ataques de phishing e
              pharming, nos quais os criminosos tentam enganar os usuários para
              revelar informações confidenciais ou redirecioná-los para sites falsos.
            </p>
            <p>
              <strong className="font-bold">
                Redução de Fraudes de Identidade:{' '}
              </strong>
              Um IP fixo oferece uma camada adicional de autenticação e validação de
              identidade, tornando mais difícil para os fraudadores se passarem pelo
              cliente ou acessarem a conta ilegalmente. Isso ajuda a proteger as
              informações pessoais e financeiras contra roubo de identidade e outras
              formas de fraude.
            </p>
            <p>
              <strong className="font-bold">
                Fortalecimento da Segurança de Dados:{' '}
              </strong>
              Com um IP fixo, a instituição financeira pode implementar medidas de
              segurança mais robustas, como firewalls e sistemas de detecção de
              intrusos, para proteger a conta contra ataques cibernéticos. Isso
              garante a integridade e a confidencialidade dos dados financeiros.
            </p>
            <p>
              <strong className="font-bold">
                Conformidade com Normas de Segurança:{' '}
              </strong>
              A utilização de um IP fixo é uma prática recomendada para estar em
              conformidade com as normas e regulamentações de segurança cibernética
              do setor financeiro. Ao adotar essa medida, a instituição financeira
              demonstra seu compromisso com a proteção dos interesses e da
              privacidade de seus clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
