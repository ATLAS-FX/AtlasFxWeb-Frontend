import CardForLogin from '@/components/layout/Card'
import QRCode from 'qrcode.react'

const Login: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
      <CardForLogin
        title="Acesse"
        subtitle="Sua Conta"
        option="Portal PJ"
        content={
          <div className="flex justify-between items-center gap-2">
            <p className='text-xs'>
              1. Acesse a conta da sua empresa através do celular: Abra o aplicativo
              no seu celular e faça login na sua conta empresarial. 2. Toque em Meu
              Perfil: Dentro do aplicativo, localize a seção "Meu Perfil" no menu
              principal e toque nela. 3. Toque em Acessar Portal PJ: Dentro da página
              do seu perfil, você encontrará a opção "Acessar Portal PJ". Toque nesta
              opção para prosseguir. 4. Aponte seu celular para esta tela para
              escanear o QR Code: Agora, segure seu celular na frente da tela do seu
              computador ou dispositivo onde você está visualizando esta mensagem. O
              aplicativo do banco abrirá automaticamente a câmera para escanear o QR
              Code exibido na tela. 5. Digite o token com 8 dígitos que aparecerá em
              seu celular: Após escanear o QR Code, seu celular exibirá uma chave de
              segurança de 8 dígitos. Digite este token no local indicado na tela do
              seu computador ou dispositivo para concluir o acesso ao Portal PJ.
            </p>
            <div className="flex h-fit justify-center rounded-md bg-white p-6 shadow-md transition-all sm:w-full">
              <QRCode value="https://google.com" size={200}/>
            </div>
          </div>
        }
        footer={<></>}
      />
    </div>
  )
}

export default Login
