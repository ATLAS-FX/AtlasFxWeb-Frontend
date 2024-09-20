import { IconCopyDatabase, IconExportPDF } from '@/components/icons'
import { ButtonAtlas } from '@/components/layout'
import { PDFBoleto, PDFQRCode } from '@/components/pdfs'
import { Separator } from '@/components/ui/separator'
import { useAtlas } from '@/contexts/AtlasContext'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { downloadPDF } from '@/utils/DownloadPdf'
import { generateHash } from '@/utils/GenerateCode'
import { formattedDate, formattedPrice } from '@/utils/GenerateFormatted'
import QRCode from 'qrcode.react'

interface StepBankDepositProps {
  amount: string
  type: string
  barcode: string
  qrcode: string
}

const PaymentBankDeposit: React.FC<StepBankDepositProps> = ({
  amount,
  type,
  barcode,
  qrcode
}) => {
  const { user } = useAtlas()
  const idTransaction = generateHash()

  const handleDownloadPDF = (type: string) => {
    const doc =
      type === 'bar' ? (
        <PDFBoleto
          document={user.doc}
          amount={formattedPrice(amount) || ''}
          name={user.name}
          barcode={barcode}
          bank={'Atlas Finance'}
          agency={user.agency}
          account={user.account}
          idTransaction={idTransaction}
          date={formattedDate(new Date().toString())}
        />
      ) : (
        <PDFQRCode
          document={user.doc}
          name={user.name}
          amount={formattedPrice(amount) || ''}
          pix={qrcode}
          bank={'Atlas Finance'}
          agency={user.agency}
          account={user.account}
        />
      )

    downloadPDF(doc)
  }

  const listPaymentQrCodeActions = [
    {
      title: 'Copiar QR Code',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          qrcode,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar QR Code em PDF',
      icon: IconExportPDF,
      func: () => handleDownloadPDF(type)
    }
  ]
  const listPaymentBarCodeActions = [
    {
      title: 'Copiar código de barras',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          `${barcode}`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar boleto de recarga em PDF',
      icon: IconExportPDF,
      func: () => handleDownloadPDF(type)
    }
  ]

  return (
    <>
      {type === 'qrcode' && (
        <>
          <QRCode
            value={qrcode.toString()}
            className="m-auto my-0 object-contain py-2"
            size={250}
          />
          <h4 className="py-2 text-center text-3xl font-semibold">
            Valor: R$ {amount}
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-secondary-default" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentQrCodeActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
        </>
      )}
      {type === 'bar' && (
        <>
          <h4 className="text-lg">Número do código de barras:</h4>
          <div className='text-primary-default" flex w-full items-center gap-1 rounded-xl border-2 border-primary-default fill-primary-default px-2 py-1 text-lg font-medium'>
            <h4 className="text-3xl">{barcode}</h4>
          </div>
          <h4 className="text-lg font-medium">
            Atenção! Este boleto pode levar até 30 minutos para ser processado pela
            CIP e reconhecido pelos demais bancos.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-secondary-default" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentBarCodeActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
          <Separator className="w-[52%] bg-secondary-default" />
          <h4 className="px-8 text-2xl font-semibold">
            Após o pagamento, o saldo é liberado em até 3 dias úteis.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-secondary-default" />
          </div>
        </>
      )}
    </>
  )
}

export default PaymentBankDeposit
