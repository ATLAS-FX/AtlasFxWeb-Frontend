import PoppinsRegular from '@/assets/Poppins-Regular.ttf'
import { Document, Font } from '@react-pdf/renderer'
import { ReactNode } from 'react'

interface PdfDefaultProps {
  children: ReactNode
}

export const PdfDefault: React.FC<PdfDefaultProps> = ({ children }) => {
  Font.register({
    family: 'Poppins-Regular',
    src: PoppinsRegular,
    fontWeight: 400
  })

  return <Document>{children}</Document>
}
