import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Item } from './Item'
import { checkoutItems } from './checkoutItems'

export const Sidebar: React.FC = () => {
  return (
    <ul className="flex p-4 flex-col items-center justify-start gap-2 rounded-xl border-0 bg-[#EFEFEF]">
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
      <span className="text-center text-xs font-semibold text-colorPrimary-500">
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
