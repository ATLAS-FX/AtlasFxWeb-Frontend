import { IconDoubleArrow, IconFilter } from '@/components/icons'
import { ModalConfirm, ModalPrint } from '@/components/layout'
import { PDFExtract } from '@/components/pdfs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useTransactionInfo } from '@/services/ExtractApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { TransactionType } from '@/types/Extract'
import { RegisterPixType } from '@/types/userType'
import {
  formattedDateSample,
  formattedPrice,
  invertDate
} from '@/utils/GenerateFormatted'
import { PDFViewer } from '@react-pdf/renderer'
import { ChevronRight, LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ExtractResumProps {
  action: {
    stepPage: number
    period: number
    type: string
    start: string
    end: string
    controlIn: number
    controlOut: number
    firstDate: string
    lastDate: string
  }
  setAction: Dispatch<
    SetStateAction<{
      stepPage: number
      period: number
      type: string
      start: string
      end: string
      controlIn: number
      controlOut: number
      firstDate: string
      lastDate: string
    }>
  >
  data: Record<string, RegisterPixType[]>
}

const ExtractResum: React.FC<ExtractResumProps> = ({ action, data }) => {
  const { user } = useAtlas()
  const { mutate: transaction, isLoading, isError } = useTransactionInfo()
  const [detailsTransaction, setDetailsTransaction] = useState<TransactionType>()
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false)
  const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)

  // const ButtonsOptions = [
  //   {
  //     title: 'Exportar PDF',
  //     func: () => handleDownloadPDF()
  //   },
  //   {
  //     title: 'Filtrar por data',
  //     func: () =>
  //       setAction((prev) => ({
  //         ...prev,
  //         stepPage: 1
  //       }))
  //   }
  // ]

  const sortedEntries = Object.entries(data).sort(
    ([dateA], [dateB]) => Date.parse(dateB) - Date.parse(dateA)
  )

  // const handleDownloadPDF = () => {
  //   const doc = (
  //     <PDFExtract
  //       document={user.doc}
  //       bankBalance={formattedPrice(user.amount) || '0.00'}
  //       agency={user.agency}
  //       account={user.account}
  //       extrato={sortedEntries}
  //       controlIn={formattedPrice(action.controlIn.toString()) || ''}
  //       controlOut={formattedPrice(action.controlOut.toString()) || ''}
  //       startDate={
  //         action?.start
  //           ? new Date(action?.start).toLocaleDateString()
  //           : new Date(action?.firstDate).toLocaleDateString()
  //       }
  //       endDate={
  //         action?.end
  //           ? new Date(action?.end).toLocaleDateString()
  //           : new Date(action?.lastDate).toLocaleDateString()
  //       }
  //     />
  //   )
  //   downloadPDF(doc)
  // }

  const handleTransactionInfo = async (id: string) => {
    transaction(
      {
        id: id
      },
      {
        onSuccess: (res) => {
          setDetailsTransaction(res)
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados de transação.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <>
      <button className="flex items-center gap-2 fill-system-cinza text-system-cinza">
        <IconFilter className="size-5" />
        Filtro
      </button>
      {/* <div className="flex justify-end gap-8">
        {ButtonsOptions.map((buton, number) => (
          <button
            key={number}
            className="text-base font-semibold uppercase text-shadow-3x"
            onClick={buton.func}
          >
            {buton.title}
          </button>
        ))}
      </div> */}

      {sortedEntries.map(([date, extracts], index) => (
        <div className="flex flex-col items-center" key={index}>
          <div className="grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
            {new Date(invertDate(date)).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: '2-digit'
            })}
            <Separator className="bg-system-cinza" />
          </div>
          {extracts.map((extract, i) => (
            <div
              key={i}
              className="flex w-[95%] cursor-pointer items-center justify-between border-b-[2px] border-slate-300 py-3 font-medium text-primary-default last:border-b-0 hover:bg-system-cinza/10"
              onClick={() => {
                setOpenModalDetails(true)
                handleTransactionInfo(extract?.id.toString())
              }}
            >
              <div className="flex w-10/12 flex-col items-start justify-center gap-1 text-xs">
                {extract?.send > 0 ? (
                  <h2 className="flex items-center justify-start gap-4 font-semibold capitalize">
                    <IconDoubleArrow
                      size={12}
                      className="scale-x-[-1] transform fill-[#EF4444]"
                    />
                    {extract?.method === 'TAX'
                      ? 'Tarifa'
                      : `${extract?.method} Enviado`}
                  </h2>
                ) : (
                  <h2 className="flex items-center justify-start gap-4 font-semibold capitalize">
                    <IconDoubleArrow className="fill-secondary-default" size={12} />
                    {extract?.method === 'TAX'
                      ? 'Tarifa'
                      : `${extract?.method} Recebido`}
                  </h2>
                )}
                <h4 className="ml-7 flex items-center justify-start gap-1 text-slate-500">
                  {extract?.method === 'TAX' ? '-' : extract?.name}
                </h4>
              </div>
              <div className="flex flex-col gap-1 text-end text-xs font-light">
                <p>{formattedDateSample(extract?.created)}</p>
                <label className="font-semibold">
                  R$ {extract?.send > 0 ? '-' : ''}{' '}
                  {formattedPrice(extract?.amount.toString())}
                </label>
              </div>
              <ChevronRight
                size={18}
                className="transform text-slate-400 transition-all duration-200 ease-in-out"
              />
            </div>
          ))}

          <Dialog
            open={openModalDetails}
            onOpenChange={() => setOpenModalDetails(false)}
          >
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
                          <label className="font-medium text-primary-default">
                            Nome:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            CPF/CNPJ:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientDocument}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            Instituição:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientCompanyName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            Tipo de conta:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientType}
                          </span>
                        </div>
                        <div className="grid w-full grid-cols-[auto,75%] items-center gap-4 text-sm text-system-cinza">
                          <label>Destinatário: </label>
                          <Separator className="bg-system-cinza/50" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            Nome:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            CPF/CNPJ:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.clientDocument}
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
                          <span>{detailsTransaction?.transactionData.agency}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="font-medium text-primary-default">
                            Conta:
                          </label>
                          <span>
                            {detailsTransaction?.transactionData.accountNumber}
                          </span>
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

          <ModalPrint
            openModal={openModalPrint}
            setOpenModal={setOpenModalPrint}
            ArrayButton={<></>}
            body={
              <PDFViewer width="100%" height="700px">
                <PDFExtract
                  document={user.doc}
                  bankBalance={formattedPrice(user.amount) || '0.00'}
                  agency={user.agency}
                  account={user.account}
                  extrato={sortedEntries}
                  controlIn={formattedPrice(action.controlIn.toString()) || '1'}
                  controlOut={formattedPrice(action.controlOut.toString()) || ''}
                  startDate={
                    action?.start
                      ? new Date(action?.start).toLocaleDateString()
                      : new Date(action?.firstDate).toLocaleDateString()
                  }
                  endDate={
                    action?.end
                      ? new Date(action?.end).toLocaleDateString()
                      : new Date(action?.lastDate).toLocaleDateString()
                  }
                />
              </PDFViewer>
            }
          />
        </div>
      ))}
    </>
  )
}

export default ExtractResum
