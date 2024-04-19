import { Separator } from '@/components/ui/separator'

export const Stripe: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="w-full text-center text-base font-light text-white">
        Portal PJ
      </span>
      <Separator
        orientation="vertical"
        className="h-[88vh] w-[1px] bg-colorSecondary-500"
      />
    </div>
  )
}
