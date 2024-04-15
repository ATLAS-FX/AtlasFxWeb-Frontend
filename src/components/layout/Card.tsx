import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface ICardForLogin {
  title: string
  subtitle: string
  option: string
  content: React.ReactNode
  footer: React.ReactNode
}

const CardForLogin: React.FC<ICardForLogin> = ({
  title,
  subtitle,
  option,
  content,
  footer
}) => {
  return (
    <Card className="flex min-h-[520px] w-[884px] flex-col items-center rounded-2xl bg-white px-8 py-4 shadow-md transition-all sm:w-full sm:px-8">
      <CardHeader>
        <CardTitle className="flex justify-between">
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
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  )
}

export default CardForLogin
