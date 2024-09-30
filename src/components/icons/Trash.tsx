import { IconType } from '@/types/iconType'
import { FC } from 'react'

const Trash: FC<IconType> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.78125 0.691406L5.5 1.25H1.75C1.05859 1.25 0.5 1.80859 0.5 2.5C0.5 3.19141 1.05859 3.75 1.75 3.75H16.75C17.4414 3.75 18 3.19141 18 2.5C18 1.80859 17.4414 1.25 16.75 1.25H13L12.7188 0.691406C12.5078 0.265625 12.0742 0 11.6016 0H6.89844C6.42578 0 5.99219 0.265625 5.78125 0.691406ZM16.75 5H1.75L2.57812 18.2422C2.64062 19.2305 3.46094 20 4.44922 20H14.0508C15.0391 20 15.8594 19.2305 15.9219 18.2422L16.75 5Z"
        fill={color}
      />
    </svg>
  )
}

export default Trash
