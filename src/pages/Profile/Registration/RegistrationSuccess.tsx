import RoboSucess from '@/assets/robo.png'
import { CircleCheck } from 'lucide-react'

export const RegistratrionSucess: React.FC = () => {
  return (
    <>
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <CircleCheck className="w-8" color="#32BA7C" />
        Sucesso! Seu endereço foi alterado.
      </h4>
      <div className="flex justify-end">
        <img
          className="h-72 object-contain"
          src={RoboSucess}
          alt="Sucesso ao alterar o endereço"
        />
      </div>
    </>
  )
}
