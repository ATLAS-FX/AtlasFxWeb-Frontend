import RoboSucess from '@/assets/robo.png'
import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { Separator } from '@/components/ui/separator'
import { formattedDate } from '@/utils/formatDate'
import { CircleCheck } from 'lucide-react'

interface IPaymentSuccess {
  name: string
  amount: string
  barcode?: string
  doc: string
  expired?: string
  time: string
}

const PaymentSuccess: React.FC<IPaymentSuccess> = ({
  name,
  barcode,
  doc,
  expired,
  amount
}) => {
  // const handleDownloadPDF = async () => {
  //   const styles = StyleSheet.create({
  //     page: {
  //       backgroundColor: '#eeeeee',
  //       fontFamily: 'Poppins-Regular',
  //       fontSize: 12,
  //       padding: 24
  //     },
  //     flex: {
  //       justifyContent: 'space-between',
  //       display: 'flex'
  //     },
  //     value: {
  //       color: 'gray'
  //     },
  //     logo: {
  //       width: 20,
  //       height: 20,
  //       marginBottom: 8
  //     },
  //     section: { color: 'white', textAlign: 'center', margin: 30 }
  //   })

  //   const doc = (
  //     <PdfDefault
  //       children={
  //         <Page size={[280, 720]} style={styles.page}>
  //           <Image src={Atlas_Logo} style={styles.logo} />
  //           <Text>Comprovante de transferência</Text>
  //           <Text style={styles.value}>
  //             {time ? formattedDate(time) : formattedDate(new Date().toString())}
  //           </Text>
  //           <View>
  //             <Text>Valor: {amount}</Text>
  //             <Text>Tipo de transferências: Pix</Text>
  //             <Text>Nome: {name}</Text>
  //             <Text>Código de Barras: {barcode}</Text>
  //           </View>
  //         </Page>
  //       }
  //     />
  //   )
  //   // Converte o documento PDF em blob
  //   const pdfBlob = await pdf(doc).toBlob()

  //   // Cria a URL do blob para o download
  //   const pdfUrl = URL.createObjectURL(pdfBlob)

  //   // Cria um link temporário para o download e inicia o download
  //   const a = document.createElement('a')
  //   a.href = pdfUrl
  //   a.download = `comprovante_pix_${time ? formattedDate(time) : formattedDate(new Date().toString())}.pdf`
  //   a.click()
  // }

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
          <h4 className="text-2xl font-bold">{doc}</h4>
        </div>
      </div>
      <Separator className="bg-colorPrimary-500" />
      <div className="flex items-center gap-2 font-medium">
        <label>ID da transação:</label>
        <h4 className="text-base font-semibold">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h4>
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
        // click={handleDownloadPDF}
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
