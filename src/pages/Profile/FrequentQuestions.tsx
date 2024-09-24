import { Separator } from '@/components/ui/separator'

const FrequentQuestions: React.FC = () => {
  return (
    <article className="flex flex-col gap-2">
      <div className="mb-2 flex flex-col gap-2 text-justify text-sm font-normal">
        <h4 className="text-lg font-semibold text-shadow-3x">Aviso de segurança</h4>
        <p>
          Para garantir a máxima segurança de sua conta e proteger suas informações
          financeiras, informamos que a alteração de senha de acesso à sua conta
          bancária deve ser realizada exclusivamente através do nosso aplicativo
          móvel.
        </p>
        <h4 className="font-semibold">por que via app?</h4>
        <p>
          <label className="font-semibold">Segurança Reforçada: </label>O aplicativo
          móvel oferece camadas adicionais de segurança, como autenticação
          multifatorial e criptografia avançada, para proteger suas informações
          contra acessos não autorizados.
        </p>
        <p>
          <label className="font-semibold">Controle Total: </label>
          Ao alterar sua senha pelo aplicativo, você tem controle total sobre o
          processo, garantindo que a transação seja realizada de maneira segura e
          confiável.
        </p>
        <p>
          <label className="font-semibold">Atualizações Instantâneas: </label>
          Qualquer alteração feita no aplicativo é instantaneamente refletida em sua
          conta, garantindo uma resposta rápida e eficiente.
        </p>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-secondary-default" />
      </div>
      <div className="flex flex-col gap-2 text-justify text-sm font-normal">
        <h4 className="text-lg font-semibold text-shadow-3x">
          Como alterar sua senha:
        </h4>
        <p>
          1. Acesse Sua Conta Via APP: Abra o aplicativo móvel de nosso banco e faça
          login em sua conta utilizando suas credenciais de acesso.
        </p>
        <p>
          2. Navegue até "Meu Perfil": No menu principal do aplicativo, localize a
          seção denominada "Meu Perfil" ou similar. Geralmente, essa opção está
          localizada no menu lateral ou no menu de configurações.
        </p>
        <p>
          3. Selecione "Alterar Senha": Dentro da seção "Meu Perfil", procure a opção
          para alterar sua senha. Em alguns aplicativos, essa opção pode estar
          listada como "Segurança", "Configurações de Conta" ou algo semelhante.
        </p>
        <p>
          4. Siga o Fluxo de Alteração de Senha: Ao selecionar "Alterar Senha", você
          será direcionado para uma nova tela ou fluxo de processo. Siga as
          instruções na tela para completar a alteração de senha.
        </p>
      </div>
    </article>
  )
}

export default FrequentQuestions
