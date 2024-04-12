import CardForLogin from '@/components/layout/Card'
import { Button } from '@/components/ui/button'

const Login: React.FC = () => {
  return (
    <>
      <CardForLogin
        title="Acesse Sua Conta"
        subtitle="Portal PJ"
        content={<></>}
        footer={
          <>
            <Button variant={'outline'}>Cancel</Button>
            <Button>Deploy</Button>
          </>
        }
      />
    </>
  )
}

export default Login
