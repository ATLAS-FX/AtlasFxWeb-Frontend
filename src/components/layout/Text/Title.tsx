import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft } from 'lucide-react'

interface ITitle {
  title: string
  subtitle?: string
  back: () => void
}

const Title: React.FC<ITitle> = ({ title, subtitle, back }) => {
  return (
    <div className="flex flex-col pt-4">
      <div className="flex flex-col gap-1">
        <Button
          className="ml-[-12px] h-fit w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <ChevronLeft size={18} />
          Voltar
        </Button>
        <h2 className="text-xl text-primary-default">{title}</h2>
      </div>
      <h3 className="mb-6 text-sm text-system-cinza">{subtitle}</h3>
      <Separator className="h-0.5 w-full bg-system-cinza/25" />
    </div>
  )
}

export default Title
