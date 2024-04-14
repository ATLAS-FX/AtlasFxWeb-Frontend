import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'

interface ICardForLogin {
  title: string
  subtitle: string
  content: React.ReactNode
  footer: React.ReactNode
}

const CardForLogin: React.FC<ICardForLogin> = ({
  title,
  subtitle,
  content,
  footer
}) => {
  return (
    <Card className="flex w-[884px] min-h-[520px] flex-col items-center gap-10 rounded-lg bg-white px-20 py-12 shadow-md transition-all sm:w-full sm:px-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  )
}

export default CardForLogin
