import { IconType } from '@/types/iconType'
import { FC } from 'react'

const PadLock: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 16 19"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.14286 5.34375V7.125H10.8571V5.34375C10.8571 3.70352 9.57857 2.375 8 2.375C6.42143 2.375 5.14286 3.70352 5.14286 5.34375ZM2.85714 7.125V5.34375C2.85714 2.39355 5.16071 0 8 0C10.8393 0 13.1429 2.39355 13.1429 5.34375V7.125H13.7143C14.975 7.125 16 8.19004 16 9.5V16.625C16 17.935 14.975 19 13.7143 19H2.28571C1.025 19 0 17.935 0 16.625V9.5C0 8.19004 1.025 7.125 2.28571 7.125H2.85714Z"
        fill={color}
      />
    </svg>
  )
}

export default PadLock
