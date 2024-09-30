import { ButtonNext } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRightIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import Robo from '@/assets/robo.png'

const keyOptionsList = [
  {
    title: 'CPF',
    value: 'cpf'
  },
  {
    title: 'CNPJ',
    value: 'cnpj'
  },
  {
    title: 'E-mail',
    value: 'email'
  },
  {
    title: 'Celular',
    value: 'celular'
  },
  {
    title: 'Aleatória',
    value: 'key-random'
  }
]

interface ModalPix {
  state: {
    step: number
    stateModalKey: boolean
    typeKeyPix: string
    codeKeyPix: string
    idKeyPix: string
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      stateModalKey: boolean
      typeKeyPix: string
      codeKeyPix: string
      idKeyPix: string
    }>
  >
  funcDelete: () => void
  funcCreate: () => void
  loadCreate: boolean
  loadDelete: boolean
}

const ModalPix: React.FC<ModalPix> = ({
  state,
  setState,
  funcCreate,
  funcDelete,
  loadCreate,
  loadDelete
}) => {
  return (
    <Dialog
      open={state.stateModalKey}
      onOpenChange={() => setState({ ...state, stateModalKey: false })}
    >
      <DialogContent className={cn('w-[348px] gap-4 rounded-xl bg-white')}>
        {state.typeKeyPix === 'delete' ? (
          <section className="flex flex-col gap-2 text-system-cinza">
            <div className="flex items-center gap-2">
              <Button
                className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
                variant="ghost"
                onClick={() =>
                  setState({ ...state, step: state.step >= 1 ? state.step - 1 : 0 })
                }
              >
                <ChevronLeft size={18} />
              </Button>
              <h4 className="text-base font-semibold text-primary-default">
                Excluir chave PIX?
              </h4>
            </div>
            <h4 className="text-center text-sm font-medium text-system-cinza">
              Você tem certeza que deseja excluir essa chave PIX?
            </h4>
            <div className="mt-4 flex items-center justify-around">
              <ButtonNext
                title="Cancelar"
                func={() => setState({ ...state, stateModalKey: false })}
              />
              <ButtonNext
                title="Excluir"
                func={funcDelete}
                loading={loadDelete}
                classPlus="bg-[#EF4444] hover:bg-[#aa2727]"
              />
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-4 text-system-cinza">
            <div className="flex items-center gap-2">
              <Button
                className="m-0 w-fit p-0 text-system-cinza transition-all duration-200 ease-in-out hover:scale-125 hover:bg-transparent hover:text-primary-hover"
                variant="ghost"
                onClick={() =>
                  setState({ ...state, step: state.step >= 1 ? state.step - 1 : 0 })
                }
              >
                <ChevronLeft size={18} />
              </Button>
              <h4 className="text-base font-semibold text-primary-default">
                Cadastre uma nova chave
              </h4>
            </div>
            {state.step === 0 && (
              <>
                <h3>
                  <span className="font-semibold text-primary-default">
                    Passo 1 -
                  </span>{' '}
                  Selecione o tipo de chave:
                </h3>
                <div className="flex flex-col">
                  {keyOptionsList.map(({ title, value }, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center justify-between gap-2 border-b-[1px] border-system-cinza/25 p-2 text-system-cinza hover:text-primary-default"
                      onClick={() =>
                        setState({ ...state, typeKeyPix: value, step: 1 })
                      }
                    >
                      {title}
                      <ChevronRightIcon className="transition-all duration-300 ease-in-out " />
                    </div>
                  ))}
                </div>
              </>
            )}
            {state.step === 1 && (
              <>
                <h3>
                  <span className="font-semibold text-primary-default">
                    Passo 2 -
                  </span>{' '}
                  Insira a chave:
                </h3>
                <div className="flex flex-col gap-4 py-2">
                  {state.typeKeyPix === 'key-random' ? (
                    <>
                      <h4 className="p-12 text-center text-xl font-semibold text-primary-default">
                        Sua chave aleatória será gerada automaticamente...
                      </h4>
                      <ButtonNext
                        title="Prosseguir"
                        func={funcCreate}
                        loading={loadCreate}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        placeholder="Digite a chave pix"
                        className="h-11 border-[1px] border-system-cinza/25 p-2 text-base font-medium text-primary-default"
                        value={state.codeKeyPix}
                        onChange={(e) =>
                          setState({ ...state, codeKeyPix: e.target.value })
                        }
                      />
                      <ButtonNext
                        title="Prosseguir"
                        func={funcCreate}
                        loading={loadCreate}
                      />
                    </>
                  )}
                </div>
              </>
            )}
            {state.step === 2 && (
              <div className="flex flex-col">
                <img
                  src={Robo}
                  className="m-auto w-6/12 object-contain"
                  alt="Success img"
                />
                <h4 className="p-12 text-center text-xl font-semibold text-primary-default">
                  Chave criada com sucesso!
                </h4>
                <ButtonNext
                  title="Fechar"
                  func={() =>
                    setState({
                      stateModalKey: false,
                      step: 0,
                      typeKeyPix: '',
                      codeKeyPix: '',
                      idKeyPix: ''
                    })
                  }
                />
              </div>
            )}
          </section>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalPix
