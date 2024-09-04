import { IconType } from '@/types/iconType'
import { FC } from 'react'

const EmailCircle: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 24C9.38317 24 4 18.6168 4 12C4 5.38317 9.38317 0 16 0C22.6168 0 28 5.38317 28 12C28 18.6168 22.6168 24 16 24ZM22.223 16.2155C22.371 16.2155 22.4914 16.0951 22.4914 15.9472V8.41355L16.3859 13.2619C16.273 13.3517 16.1364 13.3965 16 13.3965C15.8635 13.3965 15.727 13.3516 15.614 13.2619L9.50856 8.41355V15.9472C9.50856 16.0951 9.62898 16.2155 9.77692 16.2155H22.223ZM21.2874 7.78448L16 11.9833L10.7125 7.78448H21.2874ZM23.7328 8.05284V15.9473C23.7328 16.7797 23.0555 17.457 22.223 17.457H9.77692C8.94442 17.457 8.26722 16.7797 8.26722 15.9473V8.05284C8.26722 7.22039 8.94447 6.54314 9.77692 6.54314H22.223C23.0555 6.54309 23.7328 7.22039 23.7328 8.05284Z"
        fill={color}
      />
    </svg>
  )
}

export default EmailCircle
