import { AdminContainer } from '@/components/layout/Container'
import { Separator } from '@/components/ui/separator'
import { CircleCheck } from 'lucide-react'
import Atlas_Logo from '../assets/atlas_logo.png'

interface PdfDefaultProps {
  amount: string
  name: string
  bank: string
  ag: string
  cont: string
  transaction: string
  time: string
}

export const PdfDefault: React.FC<PdfDefaultProps> = ({
  amount,
  name,
  bank,
  ag,
  cont,
  transaction,
  time
}) => {
  return (
    <>
      <div className="flex w-full items-center justify-start p-4">
        <img
          className="h-[72px] object-contain xl:h-16"
          src={Atlas_Logo}
          alt="logo_atlas"
        />
      </div>
      <AdminContainer>
        <h4 className="flex items-center gap-2 text-sm font-semibold">
          <CircleCheck className="w-8" color="#32BA7C" />
          Sucesso! Seu endereço foi alterado.
        </h4>
        <div className="text-sm font-normal">
          <div className="flex items-center gap-2">
            <label>Valor:</label>
            <h4 className="text-base font-semibold">R$ {amount}</h4>
          </div>
          <div className="flex items-center gap-2">
            <label>Para:</label>
            <h4 className="text-base font-semibold">{name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <label>Banco:</label>
            <h4 className="text-base font-semibold">{bank}</h4>
          </div>
          <div className="flex items-center gap-2">
            <label>Agência:</label>
            <h4 className="text-base font-semibold">{ag}</h4>
            <label>Conta:</label>
            <h4 className="text-base font-semibold">{cont}</h4>
          </div>
        </div>
        <Separator className="bg-colorPrimary-500" />
        <div className="flex items-center gap-2">
          <label>ID da transação:</label>
          <h4 className="text-base font-semibold">{transaction}</h4>
        </div>
        <div className="flex items-center gap-2">
          <label>Data e hora da transação:</label>
          <h4 className="text-base font-semibold">{time}</h4>
        </div>
      </AdminContainer>
    </>
  )
}
