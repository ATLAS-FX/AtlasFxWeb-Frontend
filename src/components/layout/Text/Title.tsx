import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ITitle {
  text: string
}

export const Title: React.FC<ITitle> = ({ text }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex items-start justify-start gap-1">
        <Button
          className="m-0 w-fit p-0 hover:bg-transparent hover:text-colorSecondary-500"
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </Button>
        <h1 className="font-Bills_Bold text-4xl">{text}</h1>
      </div>
      <Separator className="w-[52%] bg-colorSecondary-500" />
    </>
  )
}
