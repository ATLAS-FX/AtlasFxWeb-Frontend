import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ICardForLogin {
  title: string
  subtitle: string
  option: string
  content: React.ReactNode
  footer: React.ReactNode
}

export const CardForLogin: React.FC<ICardForLogin> = ({
  title,
  subtitle,
  option,
  content,
  footer
}) => {
  return (
    <Card className="flex min-h-[520px] w-[884px] flex-col items-center rounded-2xl bg-white px-4 py-2 shadow-md transition-all">
      <CardHeader>
        <CardTitle className="mb-2 flex justify-between">
          <div className="flex flex-col">
            <h3
              className="text-2xl font-light text-colorPrimary-500"
              style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 4px' }}
            >
              {title}
            </h3>
            <h2
              className="text-[40px] font-semibold text-colorPrimary-500"
              style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 5px' }}
            >
              {subtitle}
            </h2>
          </div>
          <span
            className="text-3xl font-light text-colorPrimary-500"
            style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 4px' }}
          >
            {option}
          </span>
        </CardTitle>
        <Separator className="mb-0 w-[502px] bg-colorSecondary-500" />
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  )
}
