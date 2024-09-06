import { pdf } from '@react-pdf/renderer'
import { formattedDate } from './GenerateFormatted'

export const downloadPDF = async (doc: JSX.Element) => {
  const pdfBlob = await pdf(doc).toBlob()

  const pdfUrl = URL.createObjectURL(pdfBlob)

  const a = document.createElement('a')
  a.href = pdfUrl
  a.download = `comprovante_pix_${formattedDate(new Date().toString())}.pdf`
  a.click()

  document.body.removeChild(a)
}
