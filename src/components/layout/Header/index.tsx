import Atlas_Logo from '@/assets/atlas_logo.png'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex w-full items-center justify-between gap-4">
        <img
          className="h-14 cursor-pointer object-contain 2xl:h-12"
          src={Atlas_Logo}
          alt="logo_atlas"
          onClick={() => navigate('/')}
        />
        <Navbar />
      </div>
      <Separator className="bg-colorSecondary-500" />
    </div>
  )
}
