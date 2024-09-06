import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import { formattedDoc } from '@/utils/GenerateFormatted'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'

interface PdfMovementsProps {
  document: string
  type: string
  amount: string
  bankBalance: string
  payer: string
  agency: string
  account: string
  date: string
}

const PDFMovements: React.FC<PdfMovementsProps> = ({
  document,
  type,
  amount,
  bankBalance,
  agency,
  account,
  payer,
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
    valuePix: {
      color: '#f3f3f3',
      fontFamily: 'Poppins-Regular',
      fontWeight: 300,
      fontSize: 16,
      marginBottom: 8
    },
    logo: {
      width: 132,
      height: 48
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
          <View style={styles.flex}>
            <View style={styles.centerText}>
              <View style={styles.Title}>
                <Text style={{ color: '#C8D753' }}>Nome do Cliente</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>CNPJ:</Text>
                <Text style={styles.value}>{formattedDoc(document, 'cnpj')}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>Agência:</Text>
                <Text style={styles.value}>{agency}</Text>
                <Text style={styles.value}>-</Text>
                <Text style={styles.label}>Conta:</Text>
                <Text style={styles.value}>{account}</Text>
              </View>
            </View>
            <View style={styles.img}>
              <Image src={Atlas_Logo} style={styles.logo} />
            </View>
          </View>
          <View
            style={
              (styles.flex,
              {
                margin: '24px auto',
                width: '80%',
                justifyContent: 'space-between'
              })
            }
          >
            {type === 'in' && (
              <View style={styles.flex}>
                <Text style={styles.valuePix}>PIX recebido</Text>
                <Text style={styles.valuePix}>{amount}</Text>
              </View>
            )}
            {type === 'out' && (
              <View style={styles.flex}>
                <Text style={styles.valuePix}>PIX enviado</Text>
                <Text style={styles.valuePix}>{payer}</Text>
                <Text style={styles.valuePix}>{amount}</Text>
              </View>
            )}
          </View>
          <View
            style={
              (styles.flex,
              {
                margin: '24px auto',
                width: '100%',
                justifyContent: 'space-between',
                fontSize: 18
              })
            }
          >
            <View style={styles.flex}>
              <Text style={styles.valuePix}>{date}</Text>
              <Text style={styles.valuePix}>Saldo do dia: {bankBalance}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PDFMovements
