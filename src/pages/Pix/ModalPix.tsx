import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { PixType } from '@/types/PixType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPix {
  state: {
    step: number
    keyPix: string
    amount: string
    desc: string
    save: number
    pwd: string
    stateModal: boolean
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      keyPix: string
      amount: string
      desc: string
      save: number
      pwd: string
      stateModal: boolean
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
      open={state.stateModal}
      onOpenChange={() => setState({ ...state, stateModal: false })}
    >
      <DialogContent className={cn('min-w-fit gap-4 rounded-xl bg-white')}>
        {state.step === 1 && (
          <ModalConfirm
            key="confirm-modal"
            back={() => setState({ ...state, stateModal: false })}
            title={'Confira as informações do pagamento'}
            balance={`R$ ${formattedPrice(state?.amount) || ''}`}
            nameRecipient={data?.name || ''}
            document={data?.doc || ''}
            bank={data?.bank || ''}
            agency={data?.agency || ''}
            account={data?.account || ''}
            keyValue={state?.keyPix || ''}
            keyType={'pix'}
            handleFunc={() => setState({ ...state, step: 2 })}
          />
        )}
        {state.step === 2 && (
          <ModalPwd
            key="pwd-modal"
            back={() => setState({ ...state, step: 1 })}
            title={'Insira sua senha'}
            subtitle={'Sua senha é a mesma da sua conta'}
            token={(e) => setState({ ...state, pwd: e })}
            handleFunc={SendPixFunc}
            loading={loadPix}
          />
        )}
        {state.step === 3 && (
          <ModalSuccess
            key="success-modal"
            title={'Sucesso!'}
            amount={`R$ ${formattedPrice(state?.amount) || ''}`}
            back={() => setState({ ...state, step: 2 })}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalPix
