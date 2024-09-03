import { cn } from '@/lib/utils'
import { CSSProperties, ReactNode } from 'react'

interface CardHomeProps {
  title?: string
  classes?: string
  children: ReactNode
  imgBG?: CSSProperties
}

const CardHome: React.FC<CardHomeProps> = ({ title, classes, children, imgBG }) => {
  return (
    <div
      className={cn('relative rounded-xl p-8', classes)}
      style={imgBG ? imgBG : undefined}
    >
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  )
}

export default CardHome
