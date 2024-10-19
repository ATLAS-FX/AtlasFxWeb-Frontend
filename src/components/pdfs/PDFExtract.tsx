import Atlas_Logo from '@/assets/atlas_logo.png'
import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import PoppinsSemi from '@/assets/Poppins-SemiBold.ttf'
import { RegisterPixType } from '@/types/userType'
import { formattedDoc, formattedPrice, invertDate } from '@/utils/GenerateFormatted'
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
  extrato: [string, RegisterPixType[]][]
  bankBalance: string
  agency: string
  account: string
  controlIn: string
  controlOut: string
  startDate: string
  endDate: string
}

const PDFExtract: React.FC<PdfExtractProps> = ({
  document,
  extrato,
  bankBalance,
  agency,
  account,
  controlIn,
  controlOut,
  startDate,
  endDate
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
      color: '#C8D753',
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
    },
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: '#C8D753',
      marginVertical: 2,
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
          <View style={styles.flex}>
            <View style={styles.centerText}>
              <View style={styles.Title}>
                <Text style={{ color: '#C8D753' }}>Nome do Cliente</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>CNPJ:</Text>
                <Text style={styles.value}>{formattedDoc(document)}</Text>
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
          <View style={styles.flex}>
            <View style={styles.valuePix}>
              <Text>Extrato do período</Text>
            </View>
            <View style={styles.valuePix}>
              <Text>
                {startDate} a {endDate}
              </Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={styles.flex}>
            <Text style={styles.valuePix}>Total de entradas</Text>
            <Text style={styles.valuePix}>R$ {controlIn}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.valuePix}>Total de saídas</Text>
            <Text style={styles.valuePix}>R$ - {controlOut}</Text>
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
              <Text style={styles.Subtitle}>
                Saldo final do período: R$ {bankBalance}
              </Text>
            </View>
            <View style={styles.hr} />
          </View>
          <View style={styles.valuePix}>
            <Text>Transições</Text>
          </View>
          {extrato.map(([date, extracts], index) => (
            <View key={index}>
              <View style={styles.flex}>
                <Text style={styles.valuePix}>
                  {new Date(invertDate(date)).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </Text>
              </View>
              {extracts.map((extract, i) => (
                <View
                  style={{
                    ...styles.flex,
                    ...{ width: '90%', margin: '0 auto' }
                  }}
                  key={`${i + extract.id}`}
                >
                  <Text
                    style={{
                      ...styles.value,
                      ...{ textTransform: 'capitalize' },
                      ...(extract.send < 1 && { color: '#C8D753' })
                    }}
                  >
                    {extract.send < 1
                      ? `${extract.method} enviado`
                      : `${extract.method} recebido`}
                  </Text>
                  <Text
                    style={{
                      ...styles.value,
                      ...{ textTransform: 'capitalize' },
                      ...(extract.send < 1 && { color: '#C8D753' })
                    }}
                  >
                    {extract.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.value,
                      ...(extract.send < 1 && { color: '#C8D753' })
                    }}
                  >
                    {`R$ ${extract.send >= 1 ? '-' : ''}${formattedPrice(extract.amount.toString())}`}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default PDFExtract
