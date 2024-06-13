import { IconCalendar } from '@/components/icons/Calendar'
import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAdm } from '@/contexts/UserContext'
import { DateFormat } from '@/utils/DateFormat'
import { formatedPrice } from '@/utils/formatedPrice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Extract: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAdm()
  const [stepExtract, setStepExtract] = useState<number>(0)

  const ButtonsOptions = [
    {
      title: 'Exportar PDF',
      func: () => {}
    },
    {
      title: 'Filtrar por data',
      func: () => setStepExtract(1)
    }
  ]

  type GroupedTransactions = Record<string, App.RegisterPixProps[]>

  const groupedByDate = user.releases.reduce((acc, transaction) => {
    const date = transaction.created
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as GroupedTransactions)

  return (
    <AdminContainer>
      <Title
        text="Extrato"
        back={() =>
          stepExtract <= 0 ? navigate(-1) : setStepExtract((prev) => prev - 1)
        }
      />
      <div className="flex justify-end gap-8">
        {ButtonsOptions.map((buton, number) => (
          <button
            key={number}
            className="text-base font-semibold uppercase"
            style={{
              textShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 3px'
            }}
            onClick={buton.func}
          >
            {buton.title}
          </button>
        ))}
      </div>

      {stepExtract === 0 && (
        <>
          {Object.entries(groupedByDate).map(([date, extracts], index) => (
            <div className="flex flex-col items-center gap-2" key={index}>
              <div className="flex w-full items-center gap-4 rounded-lg border-2 border-colorPrimary-500 fill-colorPrimary-500 px-6 py-3 text-lg font-medium text-colorPrimary-500 transition-transform duration-300">
                <IconCalendar className="w-8" />
                {new Date(date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: '2-digit',
                  month: '2-digit'
                })}
              </div>
              {extracts.map((extract, i) => (
                <div
                  className="flex w-11/12 items-center justify-between font-medium"
                  key={i}
                >
                  <div className="flex w-7/12 flex-col items-start justify-center gap-1">
                    {extract.send > 0 ? (
                      <h2 className="flex items-center justify-between gap-1 font-semibold capitalize">
                        <IconDoubleArrow
                          size={12}
                          className="scale-x-[-1] transform fill-red-500"
                        />
                        {extract.method} Enviado
                      </h2>
                    ) : (
                      <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
                        <IconDoubleArrow
                          className="fill-colorSecondary-500"
                          size={12}
                        />
                        {extract.method} Recebido
                      </h2>
                    )}
                    <h4 className="flex items-center justify-start gap-1 font-semibold">
                      <IconDoubleArrow size={12} className="fill-transparent" />
                      {extract.name}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1 text-end text-xs">
                    <p>{DateFormat(extract.created)}</p>
                    <label className="font-semibold">
                      R$ {extract.send > 0 ? '-' : ''}{' '}
                      {formatedPrice(extract.amount.toString())}
                    </label>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                      // onClick={() => setOpenModalPrint(!openModalPrint)}
                      >
                        <IconPDFDownload
                          size={32}
                          className="fill-colorPrimary-500"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
                        Baixar extrato em PDF
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}

              <Separator className="bg-colorPrimary-500/85" />
            </div>
          ))}
        </>
      )}
      {stepExtract === 1 && (
        <>
          <h1>Teste</h1>
        </>
      )}
    </AdminContainer>
  )
}

export default Extract
