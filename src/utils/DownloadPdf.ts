import { DocumentProps, pdf } from '@react-pdf/renderer'
import { JSXElementConstructor, ReactElement } from 'react'
import { formattedDate } from './formatDate'

interface IDownloadPdf {
  doc: ReactElement<DocumentProps, string | JSXElementConstructor<any>>
  time: string
}

export const downloadPDF = async ({ doc, time }: IDownloadPdf) => {
  const pdfBlob = await pdf(doc).toBlob()

  // Cria a URL do blob para o download
  const pdfUrl = URL.createObjectURL(pdfBlob)

  // Cria um link temporário para o download e inicia o download
  const a = document.createElement('a')
  a.href = pdfUrl
  a.download = `comprovante_pix_${time ? formattedDate(time) : formattedDate(new Date().toString())}.pdf`
  a.click()

  // Remove o div temporário
  document.body.removeChild(a)
}
