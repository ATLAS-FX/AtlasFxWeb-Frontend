const QuestionsPageProfile: React.FC = () => {
  return (
    <article className="flex flex-col gap-4 text-system-cinza">
      <h3 className="text-base font-semibold text-primary-default">
        Dúvidas frequentes
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
        <h3 className="text-sm font-semibold text-primary-default">
          Como cadastrar uma chave pix?
        </h3>
        <p>
          {
            'Na tela inicial, entre em Área PIX > Gerenciar chaves > Cadastrar nova chave.'
          }
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
        <h3 className="text-sm font-semibold text-primary-default">
          Como alterar meu endereço?
        </h3>
        <p>
          {
            'Na barra de navegação inferior, clique, entre em Perfil > Dados cadastrais > Editar endereço e siga as instruções para alterar seu endereço.'
          }
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-3 text-xs">
        <h3 className="text-sm font-semibold text-primary-default">
          Como receber por QR code?
        </h3>
        <p>
          {'Na tela inicial, entre em Depósito > Gerar QR code e siga as instruções'}
        </p>
      </div>
    </article>
  )
}

export default QuestionsPageProfile
