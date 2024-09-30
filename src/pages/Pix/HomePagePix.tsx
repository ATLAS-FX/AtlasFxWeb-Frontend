import { Container, Title } from '@/components/layout'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import ContactsPagePix from './ContactsPagePix'
import FlowPagePix from './FlowPagePix'
import KeyPagePix from './KeyPagePix'

const HomePagePix: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title
        title="Área Pix"
        subtitle="Envie seus PIX. Simples e rápido."
        back={() => navigate(-1)}
      />
      <FlowPagePix />
      <Separator key="divisor-1" className="my-4 h-0.5 w-full bg-system-cinza/25" />
      <KeyPagePix />
      <Separator key="divisor-2" className="my-4 h-0.5 w-full bg-system-cinza/25" />
      <ContactsPagePix />
    </Container>
  )
}

export default HomePagePix
