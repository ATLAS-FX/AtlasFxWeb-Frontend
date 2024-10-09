import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface ICardForLogin {
  title: string
  content: React.ReactNode
  footer: React.ReactNode
}

const CardForLogin: React.FC<ICardForLogin> = ({ title, content, footer }) => {
  return (
    <Card className="flex max-w-[824px] flex-col items-center rounded-2xl bg-white px-4 py-2 shadow-md transition-all">
      <CardHeader className="flex w-full justify-start">
        <CardTitle className="flex w-full justify-start text-lg text-primary-default">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  )
}

export default CardForLogin
