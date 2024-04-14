import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'

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
    <Card className="flex min-h-[520px] w-[884px] flex-col items-center gap-10 rounded-2xl bg-white px-12 py-8 shadow-md transition-all sm:w-full sm:px-8">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {/* <div className="flex justify-between w-full"> */}
          <div className="flex flex-col">
            <h3
              className="text-2xl font-extralight"
              style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 3px' }}
            >
              {title}
            </h3>
            <h2
              className="text-4xl font-semibold"
              style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 3px' }}
            >
              {subtitle}
            </h2>
          </div>
          <h4
            className="text-3xl font-extralight"
            style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 3px' }}
          >
            {option}
          </h4>
          {/* </div> */}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  )
}

export default CardForLogin
