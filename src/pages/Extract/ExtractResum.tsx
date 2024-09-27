import { IconDoubleArrow, IconFilter } from '@/components/icons'
import { ModalPrint } from '@/components/layout'
import { PDFExtract } from '@/components/pdfs'
import { Separator } from '@/components/ui/separator'
import { useAtlas } from '@/contexts/AtlasContext'
import { RegisterPixType } from '@/types/userType'
import { downloadPDF } from '@/utils/DownloadPdf'
import {
  formattedDateSample,
  formattedPrice,
  invertDate
} from '@/utils/GenerateFormatted'
import { PDFViewer } from '@react-pdf/renderer'
import { Dispatch, SetStateAction, useState } from 'react'

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

const ExtractResum: React.FC<ExtractResumProps> = ({ action, setAction, data }) => {
  const { user } = useAtlas()
  const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)

  const ButtonsOptions = [
    {
      title: 'Exportar PDF',
      func: () => handleDownloadPDF()
    },
    {
      title: 'Filtrar por data',
      func: () =>
        setAction((prev) => ({
          ...prev,
          stepPage: 1
        }))
    }
  ]

  console.log(ButtonsOptions)

  const sortedEntries = Object.entries(data).sort(
    ([dateA], [dateB]) => Date.parse(dateB) - Date.parse(dateA)
  )

  const handleDownloadPDF = () => {
    const doc = (
      <PDFExtract
        document={user.doc}
        bankBalance={formattedPrice(user.amount) || '0.00'}
        agency={user.agency}
        account={user.account}
        extrato={sortedEntries}
        controlIn={formattedPrice(action.controlIn.toString()) || ''}
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
    )
    downloadPDF(doc)
  }

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
        <div className="flex flex-col items-center gap-4" key={index}>
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
              className="flex w-[95%] items-center justify-between font-medium"
              key={i}
            >
              <div className="flex w-10/12 flex-col items-start justify-center gap-1 text-sm">
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
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                  // onClick={() => setOpenModalPrint(!openModalPrint)}
                  >
                    <IconPDFDownload size={32} className="fill-primary-default" />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-md bg-primary-default p-2 text-sm font-normal text-white">
                    Baixar extrato em PDF
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
          ))}

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
