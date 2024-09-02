import RoboSucess from '@/assets/robo.png'
import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { PDFPix } from '@/components/PDFTypes/PDFPix'
import { Separator } from '@/components/ui/separator'
import { useAtlas } from '@/contexts/AtlasContext'
import { downloadPDF } from '@/utils/DownloadPdf'
import { formattedDate } from '@/utils/FormattedDate'
import { formatedPrice } from '@/utils/FormattedPrice'
import { generateHash } from '@/utils/GenerateCode'
import { CircleCheck } from 'lucide-react'

interface IPixSuccess {
  name: string
  bank: string
  agency: string
  account: string
  transaction: string
  time: string
  amount: string
}

const PixSuccess: React.FC<IPixSuccess> = ({
  name,
  bank,
  agency,
  account,
  time,
  amount
}) => {
  const { user } = useAtlas()
  const idTransaction = generateHash()

  const handleDownloadPDF = () => {
    const doc = (
      <PDFPix
        nameSent={user.name}
        documentSent={user.doc}
        bankSent={user.bank}
        agencySent={user.agency}
        accountSent={user.account}
        amount={formatedPrice(amount) || ''}
        nameReceiver={name}
        documentReceiver={'-'}
        bankReceiver={bank}
        agencyReceiver={agency}
        accountReceiver={account}
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
        Sucesso! Seu Pix foi efetuado.
      </h4>
      <div className="text-sm font-medium">
        <div className="flex items-center gap-2">
          <label>Valor:</label>
          <h4 className="text-base font-bold">R$ {amount}</h4>
        </div>
        <div className="flex items-center gap-2">
          <label>Para:</label>
          <h4 className="text-base font-semibold">{name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <label>Banco:</label>
          <h4 className="text-base font-semibold">{bank}</h4>
        </div>
        <div className="flex items-center gap-2">
          <label>Agência:</label>
          <h4 className="text-base font-semibold">{agency}</h4>
          <label>Conta:</label>
          <h4 className="text-base font-semibold">{account}</h4>
        </div>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <div className="flex items-center gap-2 font-medium">
        <label>ID da transação:</label>
        <h4 className="text-base font-semibold">{idTransaction}</h4>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <label>Data e hora da transação:</label>
        <h4 className="text-base font-semibold">{time}</h4>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <ButtonAtlas
        title="Baixa comprovante em PDF"
        classButton="w-fit px-4 text-bold"
        click={handleDownloadPDF}
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

export default PixSuccess
