import { IconType } from '@/types/iconType'
import { FC } from 'react'

const Point: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="3" cy="3" r="3" fill={color || '#C8D753'} />
    </svg>
  )
}

export default Point
