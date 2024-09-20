import React, { ReactNode } from 'react'

interface IContainer {
  children: ReactNode
}

const Container: React.FC<IContainer> = ({ children }) => {
  return (
    <div className="relative flex h-[calc(100dvh-80px)] flex-col gap-8 overflow-y-auto overflow-x-hidden px-4">
      {children}
    </div>
  )
}

export default Container
