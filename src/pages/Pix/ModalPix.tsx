import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { PixType } from '@/types/PixType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPix {
  state: {
    step: number
    select: string
    desc: string
    keyPix: string
    save: number
    amount: string
    pwd: string
    modalPix: boolean
    modalKey: boolean
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      select: string
      desc: string
      keyPix: string
      save: number
      amount: string
      pwd: string
      modalPix: boolean
      modalKey: boolean
    }>
  >
  data: PixType | null
  SendPixFunc: () => void
  loadPix: boolean
}

const ModalPix: React.FC<ModalPix> = ({
  state,
  setState,
  data,
  SendPixFunc,
  loadPix
}) => {
  return (
    <Dialog
      open={state.modalPix}
      onOpenChange={() => setState({ ...state, modalPix: false })}
    >
      <DialogContent className={cn('min-w-fit gap-4 rounded-xl bg-white')}>
        {state.step === 2 && (
          <ModalConfirm
            key="confirm-modal"
            back={() =>
              state.step === 2
                ? setState({
                    ...state,
                    modalPix: false,
                    step: 0,
                    pwd: '',
                    amount: '',
                    keyPix: '',
                    save: 0,
                    select: '',
                    desc: ''
                  })
                : setState({ ...state, step: state.step - 1 })
            }
            title={'Confira as informações do pagamento'}
            contain={
              <div className="flex flex-col gap-4 text-sm font-normal text-system-cinza">
                <div className="m-auto flex w-5/6 flex-col items-center rounded-md border-[1px] border-system-cinza/25 p-4">
                  <h4 className="text-base font-semibold">
                    {`R$ ${formattedPrice(state?.amount || '0,00')?.toString()}`}
                  </h4>
                  <label className="font-bold text-primary-default">
                    {data?.name || ''}
                  </label>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Nome do destinatário:
                  </label>
                  <span>{data?.name || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">CPF:</label>
                  <span>{data?.doc || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Instituição:
                  </label>
                  <span>{data?.bank || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">Conta:</label>
                  <span>{data?.account || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Agência:
                  </label>
                  <span>{data?.agency || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Chave Pix:
                  </label>
                  <span>
                    {state?.keyPix.length > 28
                      ? `${state?.keyPix.substring(0, 28)}...`
                      : state?.keyPix}
                  </span>
                </div>
              </div>
            }
            handleFunc={() => setState({ ...state, step: 3 })}
          />
        )}
        {state.step === 3 && (
          <ModalPwd
            key="pwd-modal"
            back={() => setState({ ...state, step: 2 })}
            title={'Insira sua senha'}
            subtitle={'Sua senha é a mesma da sua conta'}
            token={(e) => setState({ ...state, pwd: e })}
            handleFunc={SendPixFunc}
            loading={loadPix}
          />
        )}
        {state.step === 4 && (
          <ModalSuccess
            key="success-modal"
            title={'Sucesso!'}
            back={() => setState({ ...state, step: 3 })}
            amount={`R$ ${formattedPrice(state?.amount) || ''}`}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalPix
