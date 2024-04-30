import RoboSucess from '@/assets/robo.png'
import { IconKey } from '@/components/icons/Key'
import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface IKeyPixSuccess {
  step: Dispatch<SetStateAction<number>>
}

const KeyPixSuccess: React.FC<IKeyPixSuccess> = ({ step }) => {
  return (
    <>
      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <CircleCheck className="w-8" color="#32BA7C" />
        Sucesso! Seu endereço foi alterado.
      </h4>
      <Button
        className=" flex h-10 w-fit items-center gap-2 rounded-lg border-2 border-colorPrimary-500 bg-white fill-colorPrimary-500 px-6 py-4 text-base font-semibold"
        variant="outline"
        onClick={() => step(0)}
      >
        <IconKey size={24} />
        Minhas chaves Pix
      </Button>
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

export default KeyPixSuccess
