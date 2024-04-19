import { IconDoubleArrow } from '@/components/icons/DoubleArrow'
import { IconPDFDownload } from '@/components/icons/PDFDownload'

interface IMovements {}

export const Movements: React.FC<IMovements> = () => {
  return (
    <div className="flex items-center justify-between gap-2 text-white">
      <div className="flex flex-col items-start justify-center gap-1 text-xs">
        <h2 className="flex items-center justify-start gap-1 font-semibold">
          <IconDoubleArrow size={12} className="fill-colorSecondary-500" />
          Pix Enviado
        </h2>
        <h4 className="flex items-center justify-start gap-1">
          <IconDoubleArrow size={12} className="fill-transparent" />
          [Nome do Remetente]
        </h4>
      </div>
      <div className="flex flex-col gap-1 text-end text-xs font-light">
        <p>DD/MM/AA</p>
        <label className="font-semibold">R$ 1.000.000,00</label>
      </div>
      <IconPDFDownload size={32} className="fill-white" />
    </div>
  )
}
