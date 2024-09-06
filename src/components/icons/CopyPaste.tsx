import { IconType } from '@/types/iconType'
import { FC } from 'react'

const CopyPaste: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 12 14"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.57143 0.0625H8.89554C9.23571 0.0625 9.5625 0.200708 9.80357 0.444605L11.6223 2.28467C11.8634 2.52856 12 2.85918 12 3.20334V9.16797C12 9.88611 11.4241 10.4688 10.7143 10.4688H5.57143C4.86161 10.4688 4.28571 9.88611 4.28571 9.16797V1.36328C4.28571 0.645142 4.86161 0.0625 5.57143 0.0625ZM1.28571 3.53125H3.42857V5.26562H1.71429V12.2031H6.85714V11.3359H8.57143V12.6367C8.57143 13.3549 7.99554 13.9375 7.28571 13.9375H1.28571C0.575893 13.9375 0 13.3549 0 12.6367V4.83203C0 4.11389 0.575893 3.53125 1.28571 3.53125Z"
        fill={color}
      />
    </svg>
  )
}

export default CopyPaste
