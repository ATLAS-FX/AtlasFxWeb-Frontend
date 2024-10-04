import RoboSuccess from '@/assets/robo.png'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatKeyPix } from '@/utils/FormattedKeyPix'
import { ChevronLeft } from 'lucide-react'

interface ModalConfirmProps {
  title: string
  amount: string
  typeTransfer: string
  idTransfer: string
  namePayer: string
  docPayer: string
  bankPayer: string
  typeAccountPayer: string
  keyPixPayer: string
  nameRecipient: string
  docRecipient: string
  bankRecipient: string
  agencyRecipient: string
  accountRecipient: string
  back: () => void
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  title,
  amount,
  typeTransfer,
  idTransfer,
  namePayer,
  docPayer,
  bankPayer,
  typeAccountPayer,
  keyPixPayer,
  nameRecipient,
  docRecipient,
  bankRecipient,
  agencyRecipient,
  accountRecipient,
  back
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <ChevronLeft size={18} />
        </Button>
        <DialogTitle className="text-base font-semibold text-primary-default">
          {title}
        </DialogTitle>
        <DialogDescription>{''}</DialogDescription>
      </div>
      <section className="flex gap-2">
        <div className="flex w-4/12 flex-col items-center gap-8 rounded-xl bg-primary-default p-6">
          <h4 className="w-full text-center text-xl font-semibold text-secondary-default">
            Sucesso!
          </h4>
          <img
            className="h-48 object-contain"
            src={RoboSuccess}
            alt="Sucesso ao alterar o endereço"
          />
          <h4 className="text-center text-xl text-system-neutro">
            Sua transferência foi realizada com sucesso!
          </h4>
        </div>
        <div className="flex w-8/12 flex-col gap-2 p-4 text-sm font-medium text-system-cinza">
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Valor:</label>
            <h4>{amount}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Tipo de transferência:</label>
            <h4>{typeTransfer}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">ID da transferência:</label>
            <h4>{idTransfer}</h4>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-[64px]">Origem:</h4>
            <Separator className="w-[calc(100%-72px)] bg-system-cinza" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Nome:</label>
            <h4>{namePayer}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">CPF/CNPJ:</label>
            <h4>{formatKeyPix(docPayer).formattedKey}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Instituição:</label>
            <h4>{bankPayer}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Tipo de conta:</label>
            <h4>{typeAccountPayer}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Chave pix:</label>
            <h4>{keyPixPayer}</h4>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-[92px]">Destinatário:</h4>
            <Separator className="w-[calc(100%-102px)] bg-system-cinza" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Nome:</label>
            <h4>{nameRecipient}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">CPF/CNPJ:</label>
            <h4>{formatKeyPix(docRecipient).formattedKey}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Instituição:</label>
            <h4>{bankRecipient}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Agência:</label>
            <h4>{agencyRecipient}</h4>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-primary-default">Conta:</label>
            <h4>{accountRecipient}</h4>
          </div>
        </div>
      </section>
    </>
  )
}

export default ModalConfirm
