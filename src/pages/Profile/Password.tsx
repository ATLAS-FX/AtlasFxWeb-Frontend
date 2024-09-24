const Password: React.FC = () => {
  return (
    <article className="flex flex-col gap-4 text-system-cinza">
      <h3 className="text-base font-semibold text-primary-default">
        Aviso de segurança
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
        <p>
          Para garantir a máxima segurança de sua conta e proteger suas informações
          financeiras, informamos que a alteração de senha de acesso à sua conta
          bancária deve ser realizada exclusivamente através do nosso aplicativo
          móvel.
        </p>
      </div>
      <h3 className="text-base font-semibold text-primary-default">
        Por que via app?
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
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
      <h3 className="text-base font-semibold text-primary-default">
        Como alterar sua senha:
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
        <p>
          <label className="font-semibold">1. Acesse Sua Conta Via APP:</label> Abra
          o aplicativo móvel de nosso banco e faça login em sua conta utilizando suas
          credenciais de acesso.
        </p>
        <p>
          <label className="font-semibold">2. Navegue até "Meu Perfil":</label> No
          menu principal do aplicativo, localize a seção denominada{' '}
          <strong>"Meu Perfil"</strong> ou similar. Geralmente, essa opção está
          localizada no menu lateral ou no menu de configurações.
        </p>
        <p>
          <label className="font-semibold">3. Selecione "Alterar Senha":</label>{' '}
          Dentro da seção <strong>"Meu Perfil"</strong>, procure a opção para alterar
          sua senha. Em alguns aplicativos, essa opção pode estar listada como
          "Segurança", "Configurações de Conta" ou algo semelhante.
        </p>
        <p>
          <label className="font-semibold">
            4. Siga o Fluxo de Alteração de Senha:
          </label>{' '}
          Ao selecionar <strong>"Alterar Senha"</strong>, você será direcionado para
          uma nova tela ou fluxo de processo. Siga as instruções na tela para
          completar a alteração de senha.
        </p>
      </div>
    </article>
  )
}

export default Password
