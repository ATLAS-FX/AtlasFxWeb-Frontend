import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft } from 'lucide-react'

interface ITitle {
  text: string
  back: () => void
}

export const Title: React.FC<ITitle> = ({ text, back }) => {
  return (
    <>
      <div className="flex items-center justify-start gap-1">
        <Button
          className="m-0 w-fit p-0 hover:bg-transparent hover:text-colorSecondary-500"
          variant="ghost"
          onClick={back}
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </Button>
        <h1
          className="font-Bills_Bold text-3xl uppercase"
          style={{
            textShadow: 'rgba(0, 0, 0, 0.) 0px 3px 3px'
          }}
        >
          {text}
        </h1>
      </div>
      <Separator className="w-[52%] bg-colorSecondary-500" />
    </>
  )
}
