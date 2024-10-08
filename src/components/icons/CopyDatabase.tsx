import { IconType } from '@/types/iconType'
import { FC } from 'react'

const CopyDatabase: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.4 6.93313H20.8V16.4665C20.8 17.6157 20.3434 18.7179 19.5308 19.5306C18.7181 20.3433 17.6159 20.7998 16.4667 20.7998H6.93332V23.3998C6.93332 24.0894 7.20725 24.7507 7.69484 25.2383C8.18244 25.7259 8.84376 25.9998 9.53332 25.9998H23.4C24.0895 25.9998 24.7509 25.7259 25.2385 25.2383C25.7261 24.7507 26 24.0894 26 23.3998V9.53313C26 8.84357 25.7261 8.18225 25.2385 7.69466C24.7509 7.20706 24.0895 6.93313 23.4 6.93313Z"
        fill={color}
      />
      <path
        d="M16.4667 0H2.6C1.16406 0 0 1.16406 0 2.6V16.4667C0 17.9026 1.16406 19.0667 2.6 19.0667H16.4667C17.9026 19.0667 19.0667 17.9026 19.0667 16.4667V2.6C19.0667 1.16406 17.9026 0 16.4667 0Z"
        fill={color}
      />
    </svg>
  )
}

export default CopyDatabase
