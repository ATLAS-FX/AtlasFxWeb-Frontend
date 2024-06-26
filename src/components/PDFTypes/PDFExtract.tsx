import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import { formattedDoc } from '@/utils/FormattedDoc'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'

interface PdfExtractProps {
  document: string
  barcode: string
  name: string
  bank: string
  agency: string
  account: string
  date: string
}

export const PDFExtract: React.FC<PdfExtractProps> = ({
  document,
  barcode,
  agency,
  account,
  name,
  bank,
  date
}) => {
  Font.register({
    family: 'Poppins-Regular',
    src: PoppinsRegular
  })
  Font.register({
    family: 'Poppins-Semi',
    src: PoppinsSemi
  })

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Poppins-Regular',
      backgroundColor: '#3B5396',
      letterSpacing: 0.6,
      fontWeight: 500
    },
    topLine: {
      backgroundColor: '#C8D753',
      color: '#253161',
      textAlign: 'center',
      padding: 4
    },
    section: {
      padding: 24,
      fontSize: 12,
      color: '#C8D753'
    },
    viewFlex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: '4px',
      rowGap: '4px'
    },
    img: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24
    },
    centerText: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginBottom: 24
    },
    Title: {
      color: '#FFF',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: '8px'
    },
    Subtitle: {
      color: '#FFF',
      fontSize: 18
    },
    label: {
      color: '#FFF',
      fontFamily: 'Poppins-Semi',
      fontWeight: 500,
      marginBottom: 8
    },
    value: {
      color: '#f3f3f3',
      fontFamily: 'Poppins-Regular',
      fontWeight: 300,
      marginBottom: 8
    },
    logo: {
      width: 132,
      height: 48
    },
    qrCode: {
      width: 240,
      height: 240
    },
    barcode: {
      width: 672,
      // height: 78,
      marginVertical: 10
    },
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: '#FFF',
      marginVertical: 10,
      margin: '10 0'
    }
  })

  return (
    <Document>
      <Page style={styles.page} size={[720, 1280]}>
        <View style={styles.topLine}>
          <Text style={{ fontSize: 14, fontFamily: 'Poppins-Semi' }}>
            www.atlasfinance.com.br
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.img}>
            <Image src={Atlas_Logo} style={styles.logo} />
          </View>
          <View style={styles.centerText}>
            <View style={styles.Title}>
              <Text>Nome do Cliente</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>CPF/CNPJ:</Text>
              <Text style={styles.value}>{formattedDoc(document, 'cnpj')}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Agência:</Text>
              <Text style={styles.value}>{agency}</Text>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.value}>{account}</Text>
            </View>
            <View
              style={
                (styles.flex,
                {
                  marginTop: '24px',
                  width: '100%',
                  justifyContent: 'space-between'
                })
              }
            >
              <Text style={styles.value}>Extrato do período</Text>
              <Text style={styles.value}>
                {date} a {date}
              </Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.Subtitle}>Dados de pagamento</Text>
          </View>
          <View style={styles.viewFlex}>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{name}</Text>
              <Text style={styles.label}>CPF/CNPJ:</Text>
              <Text style={styles.value}>{formattedDoc(document, 'cnpj')}</Text>
              <Text style={styles.label}>Linha de Código de barras:</Text>
              <Text style={styles.value}>{barcode}</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Instuição:</Text>
              <Text style={styles.value}>{bank}</Text>
              <Text style={styles.label}>Agência:</Text>
              <Text style={styles.value}>{agency}</Text>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.value}>{account}</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={styles.viewFlex}>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Data e hora:</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
