import { FC } from 'react'

export const IconAddress: FC<App.IconProps> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 23 23"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.5 3.36914C10.3854 3.36914 9.47852 4.276 9.47852 5.39062C9.47852 6.50525 10.3854 7.41211 11.5 7.41211C12.6146 7.41211 13.5215 6.50525 13.5215 5.39062C13.5215 4.276 12.6146 3.36914 11.5 3.36914Z"
        fill={color}
      />
      <path
        d="M11.5 0C8.52761 0 6.10938 2.41824 6.10938 5.39062C6.10938 6.40997 6.39558 7.40298 6.93727 8.26229L11.5 15.543L16.0627 8.26229C16.6044 7.40298 16.8906 6.40997 16.8906 5.39062C16.8906 2.41824 14.4724 0 11.5 0ZM11.5 8.75977C9.64241 8.75977 8.13086 7.24821 8.13086 5.39062C8.13086 3.53304 9.64241 2.02148 11.5 2.02148C13.3576 2.02148 14.8691 3.53304 14.8691 5.39062C14.8691 7.24821 13.3576 8.75977 11.5 8.75977Z"
        fill={color}
      />
      <path d="M8.2207 23H14.7774L14.2592 18.9121H8.7259L8.2207 23Z" fill={color} />
      <path
        d="M8.89453 17.5642H11.1817L9.27303 14.5371L8.89453 17.5642Z"
        fill={color}
      />
      <path
        d="M15.4443 17.5645H20.753L19.0684 13.5215H14.9258L15.4443 17.5645Z"
        fill={color}
      />
      <path
        d="M2.24609 17.5645H7.53635L8.04172 13.5215H3.93066L2.24609 17.5645Z"
        fill={color}
      />
      <path
        d="M11.8184 17.5645H14.0859L13.7028 14.5762L11.8184 17.5645Z"
        fill={color}
      />
      <path
        d="M7.36771 18.9121H1.68439L0 23H6.86252L7.36771 18.9121Z"
        fill={color}
      />
      <path
        d="M21.3147 18.9121H15.6172L16.1355 23H22.9991L21.3147 18.9121Z"
        fill={color}
      />
    </svg>
  )
}