import { IconDoubleArrow, IconDownload } from '@/components/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { formattedDateSample, formattedPrice } from '@/utils/GenerateFormatted'

interface RegistersProps {
  id: number
  method: string
  send: number
  name: string
  amount: number
  created: string
  textColor?: string
}

const Registers: React.FC<RegistersProps> = ({
  id,
  amount,
  created,
  method,
  name,
  send,
  textColor
}) => {
  // const [openModalPrint, setOpenModalPrint] = useState<boolean>(false)

  return (
    <div
      id={id.toString()}
      className={cn(
        'flex items-center justify-between gap-2 border-b-2 border-primary-default/75 py-4',
        textColor ? '' : 'text-primary-default'
      )}
    >
      <div className="flex flex-col items-start justify-center gap-1 text-base">
        {send > 0 ? (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow
              size={12}
              className="scale-x-[-1] transform fill-secondary-default"
            />
            {method} Enviado
          </h2>
        ) : (
          <h2 className="flex items-center justify-start gap-1 font-semibold capitalize">
            <IconDoubleArrow className="fill-secondary-default" size={12} />
            {method} Recebido
          </h2>
        )}
        <h4 className="flex items-center justify-start gap-1">
          <IconDoubleArrow size={12} className="fill-transparent" />
          {name}
        </h4>
      </div>
      <div className="flex flex-col gap-1 text-end text-xs font-light">
        <p>{formattedDateSample(created)}</p>
        <label className="font-semibold">
          R$ {send > 0 ? '-' : ''} {formattedPrice(amount.toString())}
        </label>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
          // onClick={() => setOpenModalPrint(!openModalPrint)}
          >
            <IconDownload size={32} className="fill-primary-default" />
          </TooltipTrigger>
          <TooltipContent className="rounded-md bg-primary-default p-2 text-sm font-normal text-white">
            Baixar extrato em PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* <ModalPrint
        openModal={openModalPrint}
        setOpenModal={setOpenModalPrint}
        ArrayButton={<></>}
        body={
          <PDFViewer width="100%" height="700px">
            <PDFQRCode
              doc={' - '}
              name={name}
              pix={' - '}
              bank={' - '}
              agency={' - '}
              account={' - '}
            />
          </PDFViewer>
        }
      /> */}
    </div>
  )
}

export default Registers
