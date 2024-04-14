import CardForLogin from '@/components/layout/Card'
import { Button } from '@/components/ui/button'

const Login: React.FC = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center px-4'>
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
    </div>
  )
}

export default Login
