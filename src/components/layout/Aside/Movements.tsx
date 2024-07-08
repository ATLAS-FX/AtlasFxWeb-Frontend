import { PDFMovements } from '@/components/PDFTypes/PDFMovements'
import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAdm } from '@/contexts/UserContext'
import { downloadPDF } from '@/utils/DownloadPdf'
import { formatedPrice } from '@/utils/FormattedPrice'

export const Movements: React.FC<App.RegisterPixProps> = ({
  id,
  amount,
  created,
  method,
  name,
  send
}) => {
  const { user } = useAdm()
  const DateFormat = (value: string): string => {
    const dataObj = new Date(value)

    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      timeZone: 'America/Sao_Paulo'
    })

    return dataFormatada
  }

  const handleDownloadPDF = () => {
    const doc = (
      <PDFMovements
        payer={name}
        document={user.doc}
        type={send > 0 ? 'out' : 'in'}
        amount={`R$ ${send > 0 ? '-' : ''} ${formatedPrice(amount.toString())}`}
        bankBalance={`R$ ${formatedPrice(user?.amount.toString())}`}
        agency={user.agency}
        account={user.account}
        date={new Date(created).toLocaleDateString()}
      />
    )
    downloadPDF(doc)
  }

  return (
    <div
      id={id.toString()}
      className="grid grid-cols-[4fr,auto,auto] items-center justify-between gap-10 border-b-[1px] border-slate-400 py-2 text-white"
    >
      <div className="flex flex-col items-start justify-center gap-1 text-sm">
        {send > 0 ? (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow
              size={12}
              className="scale-x-[-1] transform fill-colorSecondary-500"
            />
            {method} Enviado
          </h2>
        ) : (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow className="fill-colorSecondary-500" size={12} />
            {method} Recebido
          </h2>
        )}
        <h4 className="flex items-center justify-start gap-1">
          <IconDoubleArrow size={12} className="fill-transparent" />
          {name}
        </h4>
      </div>
      <div className="flex flex-col gap-1 text-end text-xs font-light">
        <p>{DateFormat(created)}</p>
        <label className="font-semibold">
          R$ {send > 0 ? '-' : ''} {formatedPrice(amount.toString())}
        </label>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={handleDownloadPDF}>
            <IconPDFDownload size={32} className="fill-white" />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
            Baixar extrato em PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
