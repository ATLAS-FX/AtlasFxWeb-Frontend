import { IconDoubleArrow } from '@/components/icons'
import { RegisterPixType } from '@/types/userType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { ChevronRight } from 'lucide-react'

export const Movements: React.FC<RegisterPixType> = ({
  id,
  amount,
  created,
  method,
  name,
  send
}) => {
  // const { user } = useAtlas()
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

  // const handleDownloadPDF = () => {
  //   const doc = (
  //     <PDFMovements
  //       payer={name}
  //       document={user.doc}
  //       type={send > 0 ? 'out' : 'in'}
  //       amount={`R$ ${send > 0 ? '-' : ''} ${formatedPrice(amount.toString())}`}
  //       bankBalance={`R$ ${formatedPrice(user?.amount.toString())}`}
  //       agency={user.agency}
  //       account={user.account}
  //       date={new Date(created).toLocaleDateString()}
  //     />
  //   )
  //   downloadPDF(doc)
  // }

  return (
    <div
      id={id.toString()}
      className="flex items-center gap-1 border-b-[2px] border-slate-300 py-2 text-primary-default last:border-b-0"
    >
      <div className="flex w-10/12 flex-col items-start justify-center gap-1 text-sm">
        {send > 0 ? (
          <h2 className="flex items-center justify-start gap-4 font-semibold capitalize">
            <IconDoubleArrow
              size={12}
              className="scale-x-[-1] transform fill-[#EF4444]"
            />
            {method} Enviado
          </h2>
        ) : (
          <h2 className="flex items-center justify-start gap-4 font-semibold capitalize">
            <IconDoubleArrow className="fill-secondary-default" size={12} />
            {method} Recebido
          </h2>
        )}
        <h4 className="ml-7 flex items-center justify-start gap-1 text-slate-500">
          {name}
        </h4>
      </div>
      <div className="flex flex-col gap-1 text-end text-xs font-light">
        <p>{DateFormat(created)}</p>
        <label className="font-semibold">
          R$ {send > 0 ? '-' : ''} {formattedPrice(amount.toString())}
        </label>
      </div>
      <ChevronRight
        size={18}
        className="transform text-slate-400 transition-all duration-200 ease-in-out"
      />
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={handleDownloadPDF}>
            <IconPDFDownload size={32} className="fill-white" />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-primary-default p-2 text-sm font-normal text-white">
            Baixar extrato em PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </div>
  )
}
