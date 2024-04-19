import { FC } from 'react'

export const IconPadLock: FC<App.IconProps> = ({ size, color, fill, className }) => {
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
        d="M22.2857 11.607C22.2857 10.8377 21.6621 10.2141 20.8928 10.2141H5.10709C4.33784 10.2141 3.71423 10.8377 3.71423 11.607V14.3927H22.2857V11.607ZM6.49995 12.0713H5.57138V12.9998C5.57138 13.2562 5.36351 13.4641 5.10709 13.4641C4.85067 13.4641 4.64281 13.2562 4.64281 12.9998V11.607C4.64281 11.3506 4.85067 11.1427 5.10709 11.1427H6.49995C6.75637 11.1427 6.96423 11.3506 6.96423 11.607C6.96423 11.8634 6.75637 12.0713 6.49995 12.0713Z"
        fill={color}
      />
      <path
        d="M3.71423 24.6077C3.71423 25.377 4.33784 26.0006 5.10709 26.0006H20.8928C21.6621 26.0006 22.2857 25.377 22.2857 24.6077V21.822H3.71423V24.6077Z"
        fill={color}
      />
      <path
        d="M25.5357 15.3214H0.464286C0.207868 15.3214 0 15.5293 0 15.7857V20.4286C0 20.685 0.207868 20.8928 0.464286 20.8928H25.5357C25.7921 20.8928 26 20.685 26 20.4286V15.7857C26 15.5293 25.7921 15.3214 25.5357 15.3214ZM4.43625 18.6494C4.64959 18.7917 4.70717 19.08 4.56486 19.2934C4.42255 19.5067 4.13423 19.5643 3.92089 19.422L3.25 18.9744V19.5C3.25 19.7564 3.04213 19.9643 2.78571 19.9643C2.5293 19.9643 2.32143 19.7564 2.32143 19.5V18.9744L1.65054 19.422C1.4372 19.5643 1.14888 19.5067 1.00657 19.2934C0.864259 19.08 0.921839 18.7917 1.13518 18.6494L1.95 18.1071L1.13518 17.5648C0.921839 17.4225 0.864259 17.1342 1.00657 16.9209C1.14888 16.7075 1.4372 16.65 1.65054 16.7923L2.32143 17.2398V16.7143C2.32143 16.4578 2.5293 16.25 2.78571 16.25C3.04213 16.25 3.25 16.4578 3.25 16.7143V17.2398L3.92089 16.7923C4.0589 16.7002 4.23554 16.6888 4.38427 16.7623C4.53299 16.8357 4.63122 16.983 4.64194 17.1485C4.65267 17.3141 4.57426 17.4728 4.43625 17.5648L3.62143 18.1071L4.43625 18.6494ZM9.54339 18.6494C9.75673 18.7917 9.81431 19.08 9.672 19.2934C9.52969 19.5067 9.24137 19.5643 9.02804 19.422L8.35714 18.9744V19.5C8.35714 19.7564 8.14927 19.9643 7.89286 19.9643C7.63644 19.9643 7.42857 19.7564 7.42857 19.5V18.9744L6.75768 19.422C6.54434 19.5643 6.25603 19.5067 6.11371 19.2934C5.9714 19.08 6.02898 18.7917 6.24232 18.6494L7.05714 18.1071L6.24371 17.5648C6.03037 17.4225 5.97279 17.1342 6.11511 16.9209C6.25742 16.7075 6.54573 16.65 6.75907 16.7923L7.42857 17.2398V16.7143C7.42857 16.4578 7.63644 16.25 7.89286 16.25C8.14927 16.25 8.35714 16.4578 8.35714 16.7143V17.2398L9.02804 16.7923C9.16604 16.7002 9.34268 16.6888 9.49141 16.7623C9.64014 16.8357 9.73836 16.983 9.74909 17.1485C9.75981 17.3141 9.6814 17.4728 9.54339 17.5648L8.72857 18.1071L9.54339 18.6494ZM14.6505 18.6494C14.8639 18.7917 14.9215 19.08 14.7791 19.2934C14.6368 19.5067 14.3485 19.5643 14.1352 19.422L13.4643 18.9744V19.5C13.4643 19.7564 13.2564 19.9643 13 19.9643C12.7436 19.9643 12.5357 19.7564 12.5357 19.5V18.9744L11.8648 19.422C11.6515 19.5643 11.3632 19.5067 11.2209 19.2934C11.0785 19.08 11.1361 18.7917 11.3495 18.6494L12.1643 18.1071L11.3509 17.5648C11.1375 17.4225 11.0799 17.1342 11.2222 16.9209C11.3646 16.7075 11.6529 16.65 11.8662 16.7923L12.5357 17.2398V16.7143C12.5357 16.4578 12.7436 16.25 13 16.25C13.2564 16.25 13.4643 16.4578 13.4643 16.7143V17.2398L14.1352 16.7923C14.2732 16.7002 14.4498 16.6888 14.5986 16.7623C14.7473 16.8357 14.8455 16.983 14.8562 17.1485C14.867 17.3141 14.7885 17.4728 14.6505 17.5648L13.8357 18.1071L14.6505 18.6494ZM19.7577 18.6494C19.971 18.7917 20.0286 19.08 19.8863 19.2934C19.744 19.5067 19.4557 19.5643 19.2423 19.422L18.5714 18.9744V19.5C18.5714 19.7564 18.3636 19.9643 18.1071 19.9643C17.8507 19.9643 17.6429 19.7564 17.6429 19.5V18.9744L16.972 19.422C16.7586 19.5643 16.4703 19.5067 16.328 19.2934C16.1857 19.08 16.2433 18.7917 16.4566 18.6494L17.2714 18.1071L16.458 17.5648C16.2447 17.4225 16.1871 17.1342 16.3294 16.9209C16.4717 16.7075 16.76 16.65 16.9734 16.7923L17.6429 17.2398V16.7143C17.6429 16.4578 17.8507 16.25 18.1071 16.25C18.3636 16.25 18.5714 16.4578 18.5714 16.7143V17.2398L19.2423 16.7923C19.3803 16.7002 19.557 16.6888 19.7057 16.7623C19.8544 16.8357 19.9526 16.983 19.9634 17.1485C19.9741 17.3141 19.8957 17.4728 19.7577 17.5648L18.9429 18.1071L19.7577 18.6494ZM24.6071 19.9643H21.8214C21.565 19.9643 21.3571 19.7564 21.3571 19.5C21.3571 19.2436 21.565 19.0357 21.8214 19.0357H24.6071C24.8636 19.0357 25.0714 19.2436 25.0714 19.5C25.0714 19.7564 24.8636 19.9643 24.6071 19.9643Z"
        fill={color}
      />
      <path
        d="M7.89291 6.96429C7.89291 4.14369 10.1795 1.85714 13.0001 1.85714C15.8207 1.85714 18.1072 4.14369 18.1072 6.96429V9.28572H19.9643V6.96429C19.9643 3.11802 16.8463 0 13.0001 0C9.15378 0 6.03577 3.11802 6.03577 6.96429V9.28572H7.89291V6.96429Z"
        fill={color}
      />
    </svg>
  )
}