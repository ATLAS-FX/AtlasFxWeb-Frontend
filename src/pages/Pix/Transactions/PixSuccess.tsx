import Atlas_Logo from '@/assets/atlas_comprovante.png'
import RoboSucess from '@/assets/robo.png'
import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { Separator } from '@/components/ui/separator'
import { PdfDefault } from '@/utils/PDFDefault'
import { formattedDate } from '@/utils/formatDate'
import { Image, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
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
  const handleDownloadPDF = async () => {
    const styles = StyleSheet.create({
      page: {
        backgroundColor: '#eeeeee',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        padding: 24
      },
      flex: {
        justifyContent: 'space-between',
        display: 'flex'
      },
      value: {
        color: 'gray'
      },
      logo: {
        width: 20,
        height: 20,
        marginBottom: 8
      },
      section: { color: 'white', textAlign: 'center', margin: 30 }
    })

    const doc = (
      <PdfDefault
        children={
          <Page size={[280, 720]} style={styles.page}>
            <Image src={Atlas_Logo} style={styles.logo} />
            <Text>Comprovante de transferência</Text>
            <Text style={styles.value}>
              {time ? formattedDate(time) : formattedDate(new Date().toString())}
            </Text>
            <View>
              <Text>Valor: {amount}</Text>
              <Text>Tipo de transferências: Pix</Text>
              <Text>Nome: {name}</Text>
              <Text>Banco: {bank}</Text>
              <Text>Agência: {ag}</Text>
              <Text>Conta: {cont}</Text>
              <Text>Transaction: {transaction}</Text>
            </View>
          </Page>
        }
      />
    )
    // Converte o documento PDF em blob
    const pdfBlob = await pdf(doc).toBlob()

    // Cria a URL do blob para o download
    const pdfUrl = URL.createObjectURL(pdfBlob)

    // Cria um link temporário para o download e inicia o download
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = `comprovante_pix_${time ? formattedDate(time) : formattedDate(new Date().toString())}.pdf`
    a.click()
  }

  return (
    <>
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <CircleCheck className="w-8" color="#32BA7C" />
        Sucesso! Seu endereço foi alterado.
      </h4>
      <div className="text-sm font-medium">
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
      <div className="flex items-center gap-2 font-medium">
        <label>ID da transação:</label>
        <h4 className="text-base font-semibold">{transaction}</h4>
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
