import { cn } from '@/lib/utils'

interface IBlockPad {
  className: string
  children: React.ReactNode
}

export const BlockPad: React.FC<IBlockPad> = ({ className, children }) => {
  return (
    <div
      className={cn('mb-2 flex flex-col justify-center rounded-xl p-4', className)}
    >
      {children}
    </div>
  )
}
