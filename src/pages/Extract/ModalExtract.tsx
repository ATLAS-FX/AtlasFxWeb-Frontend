import { ModalConfirm } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { TransactionType } from '@/types/Extract'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { LoaderCircle } from 'lucide-react'

interface ModalExtractProps {
  openModalDetails: boolean
  setOpenModalDetails: (value: boolean) => void
  isLoading: boolean
  detailsTransaction: TransactionType | undefined
}

const ModalExtract: React.FC<ModalExtractProps> = ({
  openModalDetails,
  setOpenModalDetails,
  detailsTransaction,
  isLoading
}) => {
  return (
    <Dialog open={openModalDetails} onOpenChange={() => setOpenModalDetails(false)}>
      <DialogContent className={cn('max-w-[512px] gap-4 rounded-xl bg-white')}>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle className="h-48 w-48 animate-spin text-primary-default transition-transform" />
            </div>
          ) : (
            <ModalConfirm
              title={'Detalhes'}
              back={() => {}}
              contain={
                <section className="flex flex-col gap-2">
                  <div className="py-2">
                    <label className="text-sm text-system-cinza">
                      {`Transação realizada em: ${new Date(detailsTransaction?.createdAt || '').toLocaleDateString()}`}
                    </label>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Valor:
                    </label>
                    <span>
                      R$ {formattedPrice(detailsTransaction?.amount || '')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Tipo de transferência:
                    </label>
                    <span>{detailsTransaction?.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      ID da transferência:
                    </label>
                    <span>{detailsTransaction?.transactionId}</span>
                  </div>
                  <div className="grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
                    <label htmlFor="">Origem: </label>
                    <Separator className="bg-system-cinza/50" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">Nome:</label>
                    <span>
                      {detailsTransaction?.transactionData.clientNamePayer}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      CPF/CNPJ:
                    </label>
                    <span>{detailsTransaction?.transactionData.documentPayer}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Instituição:
                    </label>
                    <span>{detailsTransaction?.transactionData.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Tipo de conta:
                    </label>
                    <span>
                      {detailsTransaction?.transactionData.accountTypePayer}
                    </span>
                  </div>
                  <div className="grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
                    <label>Destinatário: </label>
                    <Separator className="bg-system-cinza/50" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">Nome:</label>
                    <span>{detailsTransaction?.transactionData.fee.feeName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      CPF/CNPJ:
                    </label>
                    <span>
                      {detailsTransaction?.transactionData.documentReceiver}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Instituição:
                    </label>
                    <span>{detailsTransaction?.transactionData.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Agência:
                    </label>
                    <span>
                      {detailsTransaction?.transactionData.accountReceiver}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-medium text-primary-default">
                      Conta:
                    </label>
                    <span>{detailsTransaction?.transactionData.accountPayer}</span>
                  </div>
                  <div className="flex items-center justify-around pt-6 text-sm">
                    <Button className="border-2 border-primary-default bg-transparent text-primary-default shadow-none transition-all duration-300 ease-in-out hover:text-white">
                      Realizar novo pagamento
                    </Button>
                    <Button className="bg-primary-default transition-all duration-300 ease-in-out">
                      Download PDF
                    </Button>
                  </div>
                </section>
              }
            />
          )}
        </>
      </DialogContent>
    </Dialog>
  )
}

export default ModalExtract
