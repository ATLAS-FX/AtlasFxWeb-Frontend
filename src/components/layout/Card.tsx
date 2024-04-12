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
    <Card className="w-[350px]">
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
