import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

interface ICardForLogin {
  title: string | React.ReactNode
  content: React.ReactNode
  back?: () => void
}

const CardForLogin: React.FC<ICardForLogin> = ({ title, back, content }) => {
  return (
    <Card className="flex min-h-[382px] min-w-[626px] max-w-[824px] flex-col gap-4 rounded-3xl border-system-cinza/25 bg-white px-4 py-2 transition-all">
      <CardHeader className="flex w-full justify-start p-5">
        {back && (
          <Button
            className="ml-[-12px] h-fit w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
            variant="ghost"
            onClick={back}
          >
            <ChevronLeft size={18} />
            Voltar
          </Button>
        )}
        <CardTitle className="flex w-full justify-start text-lg text-primary-default">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

export default CardForLogin
