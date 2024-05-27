import { pdf } from '@react-pdf/renderer'
import { formattedDate } from './formatDate'

export const downloadPDF = async (doc: JSX.Element) => {
  const pdfBlob = await pdf(doc).toBlob()

  // Cria a URL do blob para o download
  const pdfUrl = URL.createObjectURL(pdfBlob)

  // Cria um link temporário para o download e inicia o download
  const a = document.createElement('a')
  a.href = pdfUrl
  a.download = `comprovante_pix_${formattedDate(new Date().toString())}.pdf`
  a.click()

  // Remove o div temporário
  document.body.removeChild(a)
}
