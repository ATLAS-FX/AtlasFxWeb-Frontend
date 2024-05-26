import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import { formatDoc } from '@/utils/formatDoc'
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import { ReactNode } from 'react'

interface PdfDefaultProps {
  children: ReactNode
  doc: string
  ag: string
  account: string
}

export const PdfDefault: React.FC<PdfDefaultProps> = ({
  doc,
  ag,
  account,
  children
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
      backgroundColor: '#3B5396',
      fontFamily: 'Poppins-Regular',
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
    value: {
      color: '#FFF'
    },
    logo: {
      width: 132,
      height: 48
    },
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: '#C8D753',
      marginVertical: 10
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
              alignItems: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Semi'
              }}
            >
              Nome do Cliente
            </Text>
            <Image src={Atlas_Logo} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.value}>CNPJ {formatDoc(doc || '', 'cnpj')}</Text>
            <Text style={styles.value}>
              Agência {ag} - Conta {account}
            </Text>
          </View>
          <View style={styles.hr} />
          {children}
        </View>
      </Page>
    </Document>
  )
}
