import RoboSucess from '@/assets/robo.png'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CircleCheck } from 'lucide-react'

interface IPixSuccess {
  name: string
  bank: string
  ag: string
  cont: string
  transaction: string
  time: string
  amount: string
}

const PixSuccess: React.FC<IPixSuccess> = ({
  name,
  bank,
  ag,
  cont,
  transaction,
  time,
  amount
}) => {
  // const handleDownloadPDF = () => {
  //   const bodyPdf = (
  //     <PdfDefault
  //       amount={amount}
  //       name={name}
  //       ag={ag}
  //       bank={bank}
  //       cont={cont}
  //       time={time}
  //       transaction={transaction}
  //     />
  //   )
  //   // Specify the id of the element you want to convert to PDF
  //   html2canvas(bodyPdf).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png')
  //     const pdf = new jsPDF()
  //     pdf.addImage(imgData, 'PNG', 0, 0)
  //     pdf.save(`comprovante-${time}.pdf`)
  //     // Specify the name of the downloaded PDF file
  //   })
  // }

  return (
    <>
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <CircleCheck className="w-8" color="#32BA7C" />
        Sucesso! Seu endereço foi alterado.
      </h4>
      <div className="text-sm font-normal">
        <div className="flex items-center gap-2">
          <label>Valor:</label>
          <h4 className="text-base font-semibold">R$ {amount}</h4>
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
          <h4 className="text-base font-semibold">{ag}</h4>
          <label>Conta:</label>
          <h4 className="text-base font-semibold">{cont}</h4>
        </div>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <div className="flex items-center gap-2">
        <label>ID da transação:</label>
        <h4 className="text-base font-semibold">{transaction}</h4>
      </div>
      <div className="flex items-center gap-2">
        <label>Data e hora da transação:</label>
        <h4 className="text-base font-semibold">{time}</h4>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <Button
        className="w-full rounded-md bg-[#008000]"
        //  onClick={handleDownloadPDF}
      >
        Baixar comprovante em PDF
      </Button>
      <span>Seus comprovantes estão disponíveis para download no extrato.</span>
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
