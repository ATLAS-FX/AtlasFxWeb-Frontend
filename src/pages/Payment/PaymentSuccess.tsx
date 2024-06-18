import RoboSucess from '@/assets/robo.png'
import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { PDFBoleto } from '@/components/PDFTypes/PDFBoleto'
import { PDFPix } from '@/components/PDFTypes/PDFPix'
import { Separator } from '@/components/ui/separator'
import { downloadPDF } from '@/utils/DownloadPdf'
import { formattedDate } from '@/utils/FormattedDate'
import { formattedDoc } from '@/utils/FormattedDoc'
import { formatedPrice } from '@/utils/FormattedPrice'
import { generateHash } from '@/utils/GenerateCode'
import { CircleCheck } from 'lucide-react'

interface IPaymentSuccess {
  type: string
  name: string
  amount: string
  barcode: string
  document: string
  expired: string
  time: string
}

const PaymentSuccess: React.FC<IPaymentSuccess> = ({
  type,
  name,
  barcode,
  document,
  expired,
  amount
}) => {
  const idTransaction = generateHash()

  const handleDownloadPDF = (type: string) => {
    const doc =
      type === 'boleto' ? (
        <PDFBoleto
          document={formattedDoc(document, 'cnpj') || ''}
          amount={formatedPrice(amount) || ''}
          name={name}
          barcode={barcode}
          bank={'-'}
          agency={'-'}
          account={'-'}
          idTransaction={idTransaction}
          date={formattedDate(new Date().toString())}
        />
      ) : (
        <PDFPix
          documentSent={formattedDoc(document, 'cnpj') || ''}
          amount={formatedPrice(amount) || ''}
          nameSent={name}
          bankSent={'-'}
          agencySent={'-'}
          accountSent={'-'}
          nameReceiver={'-'}
          documentReceiver={'-'}
          bankReceiver={'-'}
          agencyReceiver={'-'}
          accountReceiver={'-'}
          idTransaction={idTransaction}
          date={formattedDate(new Date().toString())}
        />
      )

    downloadPDF(doc)
  }

  return (
    <>
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <CircleCheck className="w-8" color="#32BA7C" />
        Sucesso! Seu boleto foi pago.
      </h4>
      <div className="text-sm font-medium">
        <div className="flex items-center gap-2">
          <label>Valor:</label>
          <h4 className="text-base font-semibold">R$ {amount}</h4>
        </div>
        <div className="flex items-center gap-2">
          <label>Código de barras:</label>
          <h4 className="text-2xl font-semibold">{barcode}</h4>
        </div>
        {expired && (
          <div className="flex items-center gap-2">
            <label>Data do vencimento:</label>
            <h4 className="text-base font-semibold">{formattedDate(expired)}</h4>
          </div>
        )}
        <div className="flex flex-col">
          <label>Favorecido:</label>
          <h4 className="text-2xl font-bold">{name}</h4>
          <h4 className="text-2xl font-bold">{document}</h4>
        </div>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <div className="flex items-center gap-2 font-medium">
        <label>ID da transação:</label>
        <h4 className="text-base font-semibold">{idTransaction}</h4>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <label>Data e hora da transação:</label>
        <h4 className="text-base font-semibold">
          {formattedDate(new Date().toString())}
        </h4>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <ButtonAtlas
        title="Baixa comprovante em PDF"
        classButton="w-fit px-4 text-bold"
        click={() => handleDownloadPDF(type)}
      />
      <span className="font-medium">
        Seus comprovantes estão disponíveis para download no extrato.
      </span>
      <div className="flex justify-end">
        <img
          className="h-72 object-contain"
          src={RoboSucess}
          alt="Sucesso ao alterar o endereço"
        />
      </div>
    </>
  )
}

export default PaymentSuccess
