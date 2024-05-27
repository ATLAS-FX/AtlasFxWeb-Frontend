import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'

interface PdfPixProps {
  amount: string
  nameReceiver: string
  documentReceiver: string
  bankReceiver: string
  agencyReceiver: string
  accountReceiver: string
  nameSent: string
  documentSent: string
  bankSent: string
  agencySent: string
  accountSent: string
  idTransaction: string
  date: string
}

export const PDFPix: React.FC<PdfPixProps> = ({
  amount,
  nameReceiver,
  documentReceiver,
  accountReceiver,
  agencyReceiver,
  bankReceiver,
  nameSent,
  documentSent,
  bankSent,
  agencySent,
  accountSent,
  idTransaction,
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
      padding: 20,
      width: '80%'
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      textAlign: 'center'
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
              <Text>Pix</Text>
            </View>
            <View style={styles.Title}>
              <Text style={{ color: '#C8D753' }}>R$ {amount}</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.Subtitle}>Dados da conta</Text>
          </View>
          <View style={styles.viewFlex}>
            <View>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{nameSent}</Text>
              <Text style={styles.label}>CPF/CNPJ:</Text>
              <Text style={styles.value}>{documentSent}</Text>
            </View>
            <View>
              <Text style={styles.label}>Instuição:</Text>
              <Text style={styles.value}>{bankSent}</Text>
              <Text style={styles.label}>Agencia:</Text>
              <Text style={styles.value}>{agencySent}</Text>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.value}>{accountSent}</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.Subtitle}>Dados do favorecido</Text>
          </View>
          <View style={styles.viewFlex}>
            <View>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{nameReceiver}</Text>
              <Text style={styles.label}>CPF/CNPJ:</Text>
              <Text style={styles.value}>{documentReceiver}</Text>
            </View>
            <View>
              <Text style={styles.label}>Instuição:</Text>
              <Text style={styles.value}>{bankReceiver}</Text>
              <Text style={styles.label}>Agencia:</Text>
              <Text style={styles.value}>{agencyReceiver}</Text>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.value}>{accountReceiver}</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={styles.viewFlex}>
            <View>
              <Text style={styles.label}>ID de transação:</Text>
              <Text style={styles.value}>{idTransaction}</Text>
            </View>
            <View>
              <Text style={styles.label}>Data e hora:</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
