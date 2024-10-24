import { IconDownload } from '@/components/icons'
import { ModalConfirm, Tooltip } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ModalExtractProps {
  openModalDetails: boolean
  setOpenModalDetails: (value: boolean) => void
  isLoading: boolean
  downloadPDF: () => void
  // detailsTransaction: TransactionType | undefined
  dataTransaction: string
  amountTransaction: string
  typeTransaction: string
  idTransaction: string
  nameOrigin: string
  documentOrigin: string
  bankOrigin: string
  typeAccountOrigin: string
  // accountOrigin: string
  nameDestiny: string
  documentDestiny: string
  bankDestiny: string
  agencyDestiny: string
  accountDestiny: string
  // accountTypeDestiny: string
}

const ModalExtract: React.FC<ModalExtractProps> = ({
  openModalDetails,
  setOpenModalDetails,
  isLoading,
  downloadPDF,
  dataTransaction,
  amountTransaction,
  typeTransaction,
  idTransaction,
  nameOrigin,
  documentOrigin,
  bankOrigin,
  typeAccountOrigin,
  nameDestiny,
  documentDestiny,
  bankDestiny,
  agencyDestiny,
  accountDestiny
}) => {
  return (
    <Dialog open={openModalDetails} onOpenChange={() => setOpenModalDetails(false)}>
      <DialogContent
        className={cn('max-h-[782px] max-w-[512px] gap-4 rounded-xl bg-white')}
      >
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
                      {`Transação realizada em: ${dataTransaction}`}
                    </label>
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Valor:
                      </label>
                      <span>R$ {amountTransaction}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Tipo de transferência:
                      </label>
                      <span>{typeTransaction}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        ID da transferência:
                      </label>
                      <span>{idTransaction}</span>
                    </div>
                  </div>
                  <div className="mt-2 grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
                    <label htmlFor="">Origem: </label>
                    <Separator className="bg-system-cinza/50" />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Nome:
                      </label>
                      <span>{nameOrigin}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        CPF/CNPJ:
                      </label>
                      <span>{documentOrigin}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Instituição:
                      </label>
                      <Tooltip
                        children={
                          <span>
                            {(bankOrigin.length ?? 0 > 32)
                              ? `${bankOrigin.substring(0, 32)}...`
                              : bankOrigin}
                          </span>
                        }
                        content={bankOrigin}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Tipo de conta:
                      </label>
                      <span>{typeAccountOrigin}</span>
                    </div>
                  </div>
                  <div className="mt-2 grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
                    <label>Destinatário: </label>
                    <Separator className="bg-system-cinza/50" />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Nome:
                      </label>
                      <span>{nameDestiny}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        CPF/CNPJ:
                      </label>
                      <span>{documentDestiny}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Instituição:
                      </label>
                      <Tooltip
                        children={
                          <span>
                            {(bankDestiny?.length ?? 0) > 32
                              ? `${bankDestiny.substring(0, 32)}...`
                              : bankDestiny}
                          </span>
                        }
                        content={bankDestiny}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Agência:
                      </label>
                      <span>{agencyDestiny}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-medium text-primary-default">
                        Conta:
                      </label>
                      <span>{accountDestiny}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 text-sm">
                    <Link
                      className="rounded-md border-2 border-primary-default bg-transparent p-1.5 text-primary-default shadow-none transition-all duration-300 ease-in-out hover:bg-primary-default hover:text-white"
                      to={'/payments'}
                    >
                      Realizar novo pagamento
                    </Link>
                    <Button
                      className="items-center gap-2 bg-primary-default transition-all duration-300 ease-in-out"
                      onClick={() => downloadPDF()}
                    >
                      <IconDownload className="size-4 fill-white" />
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
