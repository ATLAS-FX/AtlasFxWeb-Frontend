import RoboSucess from '@/assets/robo.png'
import { IconKey } from '@/components/icons'
import { ButtonAtlas } from '@/components/layout'
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
        Sucesso! Sua chave Pix foi cadastrada.
      </h4>
      <ButtonAtlas
        title="Minhas chaves Pix"
        icon={IconKey}
        classButton="w-fit"
        click={() => step(0)}
      />
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
