import { Container, Title } from '@/components/layout'
import { useNavigate } from 'react-router-dom'

const RegistrationStep: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title
        title="Meu Perfil"
        subtitle="Gerencie seu perfil"
        back={() => navigate(-1)}
      />
      <div className="">
        <h3>Dados cadastrais</h3>
      </div>
    </Container>
  )
}

export default RegistrationStep
