import Atlas_Logo from '@/assets/atlas_logo.png'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '../Footer/Navbar'

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-full gap-4">
      <div className="flex items-center justify-between gap-4 w-full">
        <img
          className="object-contain h-14 2xl:h-12"
          src={Atlas_Logo}
          alt="logo_atlas"
        />
      <Navbar />
      </div>
        <Separator className="bg-colorSecondary-500" />
    </div>
  )
}
