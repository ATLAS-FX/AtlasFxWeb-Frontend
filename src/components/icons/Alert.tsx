import { FC } from 'react'

export const IconAlert: FC<App.IconProps> = ({ size, color, fill, className }) => {
  return (
    <svg
      width={size}
      height={size}
      color={fill}
      fill={color}
      viewBox="0 0 36 30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M33.5385 21.9282L20.9084 1.6268C20.6028 1.13035 20.1759 0.72036 19.6681 0.435672C19.1602 0.150983 18.5884 0.0010256 18.0066 5.24214e-06C17.4248 -0.00101511 16.8524 0.146936 16.3436 0.429841C15.8348 0.712747 15.4064 1.12124 15.0991 1.61662L2.44865 21.952C2.15452 22.4693 1.99989 23.0545 2 23.65C2.00011 24.2455 2.15497 24.8307 2.44931 25.3479C2.74364 25.8651 3.1673 26.2964 3.67851 26.5994C4.18972 26.9024 4.77085 27.0666 5.3646 27.0757H30.6361C31.2321 27.0662 31.8152 26.9006 32.3276 26.5953C32.84 26.2901 33.2639 25.8557 33.5573 25.3354C33.8506 24.8152 34.0032 24.227 33.9999 23.6293C33.9967 23.0316 33.8376 22.4452 33.5385 21.9282Z"
        fill="#FFD54F"
      />
      <path
        d="M16.9574 16.4056L16.6526 11.9054C16.593 10.9999 16.2802 9.53642 16.9803 8.80072C17.5131 8.23479 18.7746 8.13746 19.1573 8.92183C19.4827 9.84353 19.5547 10.834 19.3658 11.7922L18.9579 16.4249C18.9404 16.8609 18.8438 17.2903 18.6726 17.6926C18.6053 17.8227 18.5031 17.9322 18.3773 18.0092C18.2515 18.0861 18.1067 18.1276 17.9587 18.1291C17.8107 18.1306 17.6652 18.0921 17.5377 18.0178C17.4103 17.9434 17.3059 17.836 17.2358 17.7073C17.0746 17.2905 16.9806 16.8512 16.9574 16.4056ZM18.0127 22.5889C17.6513 22.5869 17.3044 22.449 17.0423 22.2033C16.7803 21.9575 16.6229 21.6223 16.6022 21.266C16.5815 20.9097 16.699 20.5589 16.9308 20.2851C17.1626 20.0113 17.4912 19.835 17.85 19.7921C18.0427 19.7691 18.2381 19.7853 18.4242 19.8398C18.6104 19.8943 18.7832 19.9858 18.9321 20.1088C19.081 20.2319 19.2028 20.3837 19.29 20.555C19.3772 20.7264 19.4279 20.9135 19.4391 21.1049C19.4502 21.2964 19.4215 21.4881 19.3548 21.6681C19.288 21.8482 19.1846 22.0128 19.051 22.1519C18.9173 22.2909 18.7562 22.4014 18.5776 22.4766C18.3991 22.5518 18.2068 22.59 18.0127 22.5889Z"
        fill="#596C76"
      />
    </svg>
  )
}