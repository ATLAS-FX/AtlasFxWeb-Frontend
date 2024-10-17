import { IconDoubleArrow, IconFilter } from '@/components/icons'
import { ModalPrint } from '@/components/layout'
import { PDFExtract } from '@/components/pdfs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { useTransactionInfo } from '@/services/ExtractApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { TransactionType } from '@/types/Extract'
import { ExtractStateType } from '@/types/StatesType'
import { RegisterPixType } from '@/types/userType'
import { formattedDate, formattedPrice, invertDate } from '@/utils/GenerateFormatted'
import { PDFViewer } from '@react-pdf/renderer'
import { ChevronRight, Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ModalExtract from './ModalExtract'
import ModalFilter from './ModalFilter'

interface SummaryPageExtractProps {
  action: ExtractStateType
  setAction: Dispatch<SetStateAction<ExtractStateType>>
  data: Record<string, RegisterPixType[]>
  extractLoading: boolean
  extractFunction: () => void
}

const SummaryPageExtract: React.FC<SummaryPageExtractProps> = ({
  action,
  setAction,
  data,
  extractLoading,
  extractFunction
}) => {
  const { user } = useAtlas()
  const { mutate: transaction, isLoading, isError } = useTransactionInfo()
  const [detailsTransaction, setDetailsTransaction] = useState<TransactionType>()
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false)
  const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)
  const [itemsToShow, setItemsToShow] = useState<Record<string, number>>({})

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

  const sortedEntries = Object.entries(data).sort(
    ([dateA], [dateB]) => Date.parse(dateB) - Date.parse(dateA)
  )

  const loadMoreItems = (date: string) => {
    setItemsToShow((prevState) => ({
      ...prevState,
      [date]: (prevState[date] || 20) + 20
    }))
  }

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

  const visibleItems = (date: string) => itemsToShow[date] || 10

  return (
    <>
      <button
        className="flex items-center gap-2 fill-system-cinza text-system-cinza"
        onClick={() => setAction({ ...action, filterModal: true })}
      >
        <IconFilter className="size-5" />
        Filtro
      </button>
      {extractLoading ? (
        <div className="-mt-1 flex flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
        </div>
      ) : (
        <>
          <article className="overflow-y-auto overflow-x-hidden">
            {sortedEntries.map(([date, extracts], index) => (
              <div className="flex flex-col items-center" key={index}>
                <div className="relative flex h-4 w-full items-center">
                  <span className="absolute bg-system-neutro px-2 text-sm capitalize text-system-cinza">
                    {new Date(invertDate(date)).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                  <Separator className="h-0.5 bg-system-cinza/50" />
                </div>
                {extracts.slice(0, visibleItems(date)).map((extract, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex w-[95%] items-center justify-between border-b-[2px] border-slate-300 py-3 font-medium text-primary-default last:border-b-0 ',
                      extract?.method !== 'TAX'
                        ? 'cursor-pointer hover:bg-system-cinza/10'
                        : 'cursor-default'
                    )}
                    onClick={() => {
                      extract?.method !== 'TAX' && setOpenModalDetails(true)
                      handleTransactionInfo(extract?.id.toString())
                    }}
                  >
                    <div className="flex w-9/12 flex-col items-start justify-center gap-1 text-xs">
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
                          <IconDoubleArrow
                            className="fill-secondary-default"
                            size={12}
                          />
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
                      <p className="font-medium">
                        {formattedDate(extract?.created)}
                      </p>
                      <label className="font-semibold">
                        R$ {extract?.send > 0 ? '-' : ''}{' '}
                        {formattedPrice(extract?.amount.toString())}
                      </label>
                    </div>
                    {extract?.method !== 'TAX' ? (
                      <ChevronRight
                        size={18}
                        className="transform text-slate-400 transition-all duration-200 ease-in-out"
                      />
                    ) : (
                      <ChevronRight
                        size={18}
                        className="transform text-slate-400/25 transition-all duration-200 ease-in-out"
                      />
                    )}
                  </div>
                ))}

                {visibleItems(date) < extracts.length && (
                  <Button
                    className="mt-4 flex items-center gap-2 px-2 text-xs"
                    onClick={() => {
                      loadMoreItems(date)
                      const loader = document.getElementById(`loader-${date}`)
                      if (loader) {
                        loader.style.display = 'inline-block'
                        setTimeout(() => {
                          loader.style.display = 'none'
                        }, 3000)
                      }
                    }}
                  >
                    Exibir mais registros...
                    <Loader2
                      id={`loader-${date}`}
                      className="size-6 animate-spin text-gray-500"
                      style={{ display: 'none' }}
                    />
                  </Button>
                )}
              </div>
            ))}
          </article>
        </>
      )}
      <ModalFilter
        state={action}
        setState={setAction}
        loading={extractLoading}
        filter={extractFunction}
      />
      <ModalExtract
        openModalDetails={openModalDetails}
        setOpenModalDetails={setOpenModalDetails}
        isLoading={isLoading}
        // detailsTransaction={detailsTransaction}
        dataTransaction={formattedDate(detailsTransaction?.createdAt ?? '-')}
        amountTransaction={
          formattedPrice(detailsTransaction?.amount.toString()) ?? '-'
        }
        typeTransaction={detailsTransaction?.type ?? '-'}
        idTransaction={detailsTransaction?.transactionId ?? '-'}
        nameOrigin={detailsTransaction?.transactionData?.clientNamePayer ?? '-'}
        documentOrigin={detailsTransaction?.transactionData?.documentPayer ?? '-'}
        bankOrigin={detailsTransaction?.transactionData?.bankName ?? '-'}
        typeAccountOrigin={
          detailsTransaction?.transactionData?.accountTypePayer ?? '-'
        }
        nameDestiny={detailsTransaction?.transactionData?.nameReceiver ?? '-'}
        documentDestiny={
          detailsTransaction?.transactionData?.documentReceiver ?? '-'
        }
        bankDestiny={detailsTransaction?.transactionData?.bankReceiver ?? '-'}
        agencyDestiny={detailsTransaction?.transactionData?.agencyReceiver ?? '-'}
        accountDestiny={detailsTransaction?.transactionData?.accountReceiver ?? '-'}
      />

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
                action?.startDate ?? new Date(action?.startDate).toLocaleDateString()
              }
              endDate={
                action?.endDate ?? new Date(action?.endDate).toLocaleDateString()
              }
            />
          </PDFViewer>
        }
      />
    </>
  )
}

export default SummaryPageExtract
