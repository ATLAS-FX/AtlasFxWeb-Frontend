import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Item } from './Item'
import { checkoutItems } from './checkoutItems'

export const Sidebar: React.FC = () => {
  return (
    <ul
      className="flex max-h-[calc(100vh-164px)] w-[84px] flex-col items-center justify-start gap-2 overflow-y-auto rounded-lg border-0 bg-[#EFEFEF] py-2"
      id="sidebar"
    >
      {checkoutItems
        .filter((item) => !item.comming)
        .map((item) => (
          <Item
            key={item.id}
            icon={item.icon}
            active={item.active}
            path={item.path}
            title={item.title}
            comming={item.comming}
          />
        ))}
      <Separator className="h-[2px] w-10/12 bg-colorPrimary-500" />
      <span className="text-center text-xs font-semibold text-colorPrimary-500 xl:text-[10px]">
        Em Breve
      </span>
      {checkoutItems
        .filter((item) => item.comming)
        .map((item) => (
          <Item
            key={item.id}
            icon={item.icon}
            active={item.active}
            path={item.path}
            title={item.title}
            comming={item.comming}
          />
        ))}
    </ul>
  )
}
