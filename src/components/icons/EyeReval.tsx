import { FC } from 'react'

export const IconEyeReveal: FC<App.IconProps> = ({
  size,
  color,
  fill,
  className
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 40 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.7226 2.5222C24.7069 2.5222 28.9255 4.73305 31.5869 6.58803C34.74 8.78567 36.3626 10.9114 36.7834 11.7222C36.3621 12.5329 34.74 14.6587 31.5869 16.8564C28.9255 18.7113 24.7069 20.9221 19.7226 20.9221C14.7383 20.9221 10.5198 18.7113 7.85836 16.8564C4.70466 14.6587 3.08263 12.5329 2.66128 11.7222C3.08263 10.9114 4.70466 8.78567 7.85776 6.58803C10.5198 4.73305 14.7383 2.5222 19.7226 2.5222ZM19.7226 0.222168C8.95335 0.222168 0.222656 9.42217 0.222656 11.7222C0.222656 14.0222 8.95335 23.2222 19.7226 23.2222C30.492 23.2222 39.2227 14.0222 39.2227 11.7222C39.2227 9.42223 30.492 0.222168 19.7226 0.222168ZM19.7226 4.82223C15.8067 4.82223 12.6317 7.91168 12.6317 11.7222C12.6317 15.5327 15.8067 18.6222 19.7226 18.6222C23.6386 18.6222 26.8135 15.5327 26.8135 11.7222C26.8135 7.91168 23.6386 4.82223 19.7226 4.82223ZM17.8134 11.7222C16.1565 11.7222 14.8133 10.4152 14.8133 8.8029C14.8133 7.1906 16.1565 5.88366 17.8134 5.88366C19.4703 5.88366 20.8135 7.19066 20.8135 8.8029C20.8135 10.4152 19.4703 11.7222 17.8134 11.7222Z"
        fill={color}
      />
    </svg>
  )
}