import Atlas_Logo from '@/assets/atlas_comprovante.png'
import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconCopyDatabase } from '@/components/icons/CopyDatabase'
import { IconExportPDF } from '@/components/icons/ExportPdf'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import BankDepositApi from '@/services/BankDepositApi'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { PdfDefault } from '@/utils/PDFDefault'
import { formattedDate } from '@/utils/formatDate'
import { Image, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import Barcode from 'react-barcode'

interface StepBankDepositProps {
  amount: string
  type: string
}

const PaymentBankDeposit: React.FC<StepBankDepositProps> = ({ amount, type }) => {
  const [bankDeposit, setBankDeposit] = useState<{
    amount: string
    barcode: string
  }>({ amount: '', barcode: '' })

  const listPaymentQrCodeActions = [
    {
      title: 'Copiar QR Code',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          `https://api.qrserver.com/v1/create-qr-code/?data=${amount}&size=250x250`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar QR Code em PDF',
      icon: IconExportPDF,
      func: () => {
        handleDownloadPDFQrCode()
      }
    }
  ]
  const listPaymentBarCodeActions = [
    {
      title: 'Copiar código de barras',
      icon: IconCopyDatabase,
      func: () => {
        handleCopyClick(
          `${bankDeposit.barcode}`,
          'Sucesso ao copiar dados para deposito',
          'Falha ao copiar dados para deposito'
        )
      }
    },
    {
      title: 'Exportar boleto de recarga em PDF',
      icon: IconExportPDF,
      func: () => {
        handleDownloadPDFBarCode()
      }
    }
  ]

  const handleDownloadPDFQrCode = async () => {
    const styles = StyleSheet.create({
      page: {
        backgroundColor: '#eeeeee',
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
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
        width: 48,
        height: 48,
        marginBottom: 8,
        objectFit: 'cover'
      },
      section: { color: 'white', textAlign: 'center', margin: 30 }
    })

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${amount}&size=250x250`

    const doc = (
      <PdfDefault
        children={
          <Page style={styles.page} size={[720, 1280]}>
            <Image src={Atlas_Logo} style={styles.logo} />
            <Text>Comprovante de transferência</Text>
            <View>
              <Text style={styles.value}>QRCode</Text>
              <Image style={{ width: 240 }} src={qrCodeUrl} />
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
    a.download = `deposito_${formattedDate(new Date().toString())}.pdf`
    a.click()
  }

  const handleDownloadPDFBarCode = async () => {
    const styles = StyleSheet.create({
      page: {
        backgroundColor: '#eeeeee',
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
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
        width: 48,
        height: 48,
        marginBottom: 8,
        objectFit: 'cover'
      },
      section: { color: 'white', textAlign: 'center', margin: 30 }
    })

    const doc = (
      <PdfDefault
        children={
          <Page style={styles.page} size={[720, 1280]}>
            <Image src={Atlas_Logo} style={styles.logo} />
            <Text>Boleto para pagamento</Text>
            <View>
              <Text style={styles.value}>Código de Barras:</Text>
              <Barcode value={bankDeposit.barcode} />
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
    a.download = `deposito_${formattedDate(new Date().toString())}.pdf`
    a.click()
  }

  const handleCreateBarCode = async () => {
    await BankDepositApi.createBarCode({ amount: amount })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu boleto foi gerado com sucesso!',
          description: res.success
        })
        setBankDeposit(res)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao gerar boleto!',
          description: e.message
        })
      })
  }

  useEffect(() => {
    if (type === 'bar') {
      handleCreateBarCode()
    }
  }, [type])

  return (
    <>
      {type === 'qrcode' && (
        <>
          <QRCode value={`${amount}`} size={250} className="m-auto my-0 py-2" />
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentQrCodeActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
        </>
      )}
      {type === 'bar' && (
        <>
          <h4 className="text-lg">Número do código de barras:</h4>
          <div className='text-colorPrimary-500" flex w-full items-center gap-1 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-lg font-medium'>
            <h4 className="text-3xl">{bankDeposit.barcode}</h4>
          </div>
          <h4 className="text-lg font-medium">
            Atenção! Este boleto pode levar até 30 minutos para ser processado pela
            CIP e reconhecido pelos demais bancos.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {listPaymentBarCodeActions.map(({ title, icon: Icon, func }, number) => (
              <ButtonAtlas key={number} title={title} icon={Icon} click={func} />
            ))}
          </div>
          <Separator className="w-[52%] bg-colorSecondary-500" />
          <h4 className="px-8 text-2xl font-semibold">
            Após o pagamento, o saldo é liberado em até 3 dias úteis.
          </h4>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
        </>
      )}
    </>
  )
}

export default PaymentBankDeposit
