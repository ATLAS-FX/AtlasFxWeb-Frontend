import React from 'react'
import { BaseBoard } from './BaseBoard'
import { navbarItems } from './navbarItems'

export const Navbar: React.FC = () => {
  return (
    <ul className="flex items-center gap-4">
      {navbarItems.map((item) => (
        <BaseBoard
          key={item.id}
          icon={item.icon}
          path={item.path}
          title={item.title}
          exit={item.exit}
        />
      ))}
    </ul>
  )
}
