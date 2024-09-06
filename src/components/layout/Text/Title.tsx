import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MoveLeft } from 'lucide-react'

interface ITitle {
  title: string
  subtitle?: string
  back: () => void
}

const Title: React.FC<ITitle> = ({ title, subtitle, back }) => {
  return (
    <div className="flex flex-col pt-4">
      <div className="flex items-center justify-start gap-2">
        <Button
          className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
          variant="ghost"
          onClick={back}
        >
          <MoveLeft size={18} />
        </Button>
        <h2 className="text-xl text-primary-default">{title}</h2>
      </div>
      <h3 className="mb-6 pl-6 text-sm text-system-cinza">{subtitle}</h3>
      <Separator className="h-0.5 w-full bg-system-cinza/25" />
    </div>
  )
}

export default Title
