import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  balance: string
  nameRecipient: string
  document: string
  bank: string
  agency: string
  account: string
  keyType: string
  key: string
  handleFunc: () => void
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  balance,
  nameRecipient,
  document,
  bank,
  agency,
  account,
  keyType,
  key,
  handleFunc,
  back
}) => {
  return (
    <section>
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
      <div className="flex flex-col gap-4 text-sm font-normal text-system-cinza">
        <div className="m-auto flex w-5/6 flex-col items-center rounded-md border-[1px] border-system-cinza/25 p-4">
          <h4 className="text-base font-semibold">{balance}</h4>
          <label className="font-bold text-primary-default">{nameRecipient}</label>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">
            Nome do destinatário:
          </label>
          <span>{nameRecipient}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">CPF:</label>
          <span>{document}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">Instituição:</label>
          <span>{bank}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">Conta:</label>
          <span>{account}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">Agência:</label>
          <span>{agency}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="font-medium text-primary-default">
            {keyType === 'boleto' ? 'Código de barras:' : 'Chave Pix:'}
          </label>
          <span>{key}</span>
        </div>
      </div>
      <ButtonNext title="Prosseguir" func={() => handleFunc} />
    </section>
  )
}

export default ModalConfirm
