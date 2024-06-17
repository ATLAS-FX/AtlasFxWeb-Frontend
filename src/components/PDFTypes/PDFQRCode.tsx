import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import { generateQRCode } from '@/utils/GenerateCode'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import { useEffect, useState } from 'react'

interface PdfQRCodeProps {
  document: string
  name: string
  pix: string
  amount: string
  bank: string
  agency: string
  account: string
}

export const PDFQRCode: React.FC<PdfQRCodeProps> = ({
  document,
  agency,
  account,
  name,
  pix,
  amount,
  bank
}) => {
  const [qrCode, setQrCode] = useState<string>('')

  // Função para gerar um QR code em base64
  useEffect(() => {
    const generateQr = async () => {
      const qrCodeData = await generateQRCode(pix, '#FFFFFF', '#0000')
      setQrCode(qrCodeData)
    }

    generateQr()
  }, [])

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
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    Title: {
      color: '#FFF',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 10
    },
    Subtitle: {
      color: '#FFF',
      fontSize: 18,
      marginBottom: 10
    },
    Value: {
      color: '#C8D753',
      fontSize: 18,
      marginBottom: 10
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
      backgroundColor: '#FFF'
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
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24
            }}
          >
            <Image src={Atlas_Logo} style={styles.logo} />
            <View style={styles.Title}>
              <Text>QR Code</Text>
            </View>
            {qrCode && <Image style={styles.qrCode} src={qrCode} />}
          </View>
          <View>
            <Text style={styles.Subtitle}>
              Valor: <Text style={{ color: '#C8D753' }}>R$ {amount}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.Subtitle}>Dados do favorecido</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{name}</Text>
              <Text style={styles.label}>CPF/CNPJ:</Text>
              <Text style={styles.value}>{document}</Text>
              <Text style={styles.label}>Chave Pix:</Text>
              <Text style={styles.value}>{pix}</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Instuição:</Text>
              <Text style={styles.value}>{bank}</Text>
              <Text style={styles.label}>Agencia:</Text>
              <Text style={styles.value}>{agency}</Text>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.value}>{account}</Text>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      </Page>
    </Document>
  )
}
