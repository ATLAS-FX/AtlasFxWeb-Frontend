import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconCopyDatabase } from '@/components/icons/CopyDatabase'
import { IconExportPDF } from '@/components/icons/ExportPdf'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import BankDepositApi from '@/services/BankDepositApi'
import { handleCopyClick } from '@/utils/Copy&Paste'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'

interface StepBankDepositProps {
  amount: string
  type: string
}

const PaymentBankDeposit: React.FC<StepBankDepositProps> = ({ amount, type }) => {
  const [bankDeposit, setBankDeposit] = useState<{
    amount: string
    barcode: string
  }>({ amount: '', barcode: '' })

  const listPaymentQrCodeActions = [
    {
      title: 'Copiar QR Code',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          `https://api.qrserver.com/v1/create-qr-code/?data=${amount}&size=250x250`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar QR Code em PDF',
      icon: IconExportPDF,
      func: () => {}
    }
  ]
  const listPaymentBarCodeActions = [
    {
      title: 'Copiar código de barras',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          `${bankDeposit.barcode}`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar boleto de recarga em PDF',
      icon: IconExportPDF,
      func: () => {}
    }
  ]

  const handleCreateBarCode = async () => {
    await BankDepositApi.createBarCode({ amount: amount })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu boleto foi gerado com sucesso!',
          description: res.success
        })
        setBankDeposit(res)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao gerar boleto!',
          description: e.message
        })
      })
  }

  useEffect(() => {
    if (type === 'bar') {
      handleCreateBarCode()
    }
  }, [type])

  return (
    <>
      {type === 'qrcode' && (
        <>
          <QRCode value={`${amount}`} size={250} className="m-auto my-0 py-2" />
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
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
          <div className='text-colorPrimary-500" flex w-full items-center gap-1 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-lg font-medium'>
            <h4 className="text-3xl">{bankDeposit.barcode}</h4>
          </div>
          <h4 className="text-lg font-medium">
            Atenção! Este boleto pode levar até 30 minutos para ser processado pela
            CIP e reconhecido pelos demais bancos.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentBarCodeActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
          <Separator className="w-[52%] bg-colorSecondary-500" />
          <h4 className="px-8 text-2xl font-semibold">
            Após o pagamento, o saldo é liberado em até 3 dias úteis.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
        </>
      )}
    </>
  )
}

export default PaymentBankDeposit
