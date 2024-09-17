import RoboSuccess from '@/assets/robo.png'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MoveLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  amount: string
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ title, amount, back }) => {
  return (
    <section className="flex items-start">
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <MoveLeft size={18} />
        </Button>
        <h4 className="text-sm font-semibold text-primary-default">{title}</h4>
      </div>
      <div className="flex w-5/12 flex-col items-center gap-8 rounded-xl bg-primary-default p-6">
        <h4 className="w-full text-center text-xl font-semibold text-secondary-default">
          Sucesso!
        </h4>
        <img
          className="h-48 object-contain"
          src={RoboSuccess}
          alt="Sucesso ao alterar o endereço"
        />
        <h4 className="text-center text-2xl text-system-neutro">
          Sua transferência foi realizada com sucesso!
        </h4>
      </div>
      <div className="flex w-8/12 flex-col gap-2 p-4 text-sm font-medium text-system-cinza">
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Valor:</label>
          <h4>R$ {amount}</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Tipo de transferência:</label>
          <h4>Copia e cola</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">ID da transferência:</label>
          <h4>XXXXXXXXXXXX</h4>
        </div>
        <div className="flex items-center gap-1">
          <h4>Origem:</h4>
          <Separator className="bg-system-cinza" />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Nome:</label>
          <h4>Nome do pagante</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">CPF/CNPJ:</label>
          <h4>***.XXX.XXX-**</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Instituição:</label>
          <h4>Inter</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Tipo de conta:</label>
          <h4>Conta corrente</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Chave pix:</label>
          <h4>***.XXX.XXX-**</h4>
        </div>
        <div className="flex items-center gap-1">
          <h4>Destinatário:</h4>
          <Separator className="bg-system-cinza" />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Nome:</label>
          <h4>Nome do destinatário</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">CPF:</label>
          <h4>***.XXX.XXX-**</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Instituição:</label>
          <h4>Inter</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Agência:</label>
          <h4>0001</h4>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-primary-default">Conta:</label>
          <h4>079*****9-1 </h4>
        </div>
      </div>
    </section>
  )
}

export default ModalConfirm
