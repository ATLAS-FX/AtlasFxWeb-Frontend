import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { PixType, SendPixType } from '@/types/PixType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPix {
  state: {
    step: number
    select: string
    desc: string
    keyPix: string
    formatKeyPix: string
    typekeyPix: string
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
      formatKeyPix: string
      typekeyPix: string
      save: number
      amount: string
      pwd: string
      modalPix: boolean
      modalKey: boolean
    }>
  >
  data: PixType | null
  dataSendPix: SendPixType | undefined
  SendPixFunc: () => void
  loadPix: boolean
}

const ModalPix: React.FC<ModalPix> = ({
  state,
  setState,
  data,
  dataSendPix,
  SendPixFunc,
  loadPix
}) => {
  return (
    <Dialog
      open={state.modalPix}
      onOpenChange={() => setState({ ...state, modalPix: false })}
    >
      <DialogContent
        className={cn(
          'w-fit gap-4 rounded-xl bg-white',
          state.step >= 4 && 'min-w-[762px]',
          state.step <= 2 && 'min-h-[442px] ',
          state.step === 3 && 'h-fit w-[348px]'
        )}
      >
        {/* <DialogContent className={cn('min-h-[442px] w-[372px] gap-4 rounded-xl bg-white')} > */}
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
                  <span className="text-end">{data?.name || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">CPF:</label>
                  <span className="text-end">{data?.doc || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Instituição:
                  </label>
                  <span className="text-end">{data?.bank || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">Conta:</label>
                  <span className="text-end">{data?.account || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Agência:
                  </label>
                  <span className="text-end">{data?.agency || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Chave Pix:
                  </label>
                  <span className="text-end">
                    {state?.formatKeyPix.length > 28
                      ? `${state?.formatKeyPix.substring(0, 28)}...`
                      : state?.formatKeyPix}
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
            token={state.pwd}
            setToken={(e) => setState({ ...state, pwd: e })}
            handleFunc={SendPixFunc}
            loading={loadPix}
          />
        )}
        {state.step === 4 && (
          <ModalSuccess
            key="success-modal"
            title={'Sucesso!'}
            back={() => setState({ ...state, step: 3 })}
            amount={`R$ ${formattedPrice(state?.amount) || 'R$ 0,00'}`}
            typeTransfer={'Pix'}
            idTransfer={dataSendPix?.id_transaction || '-'}
            namePayer={'-'}
            docPayer={''}
            bankPayer={''}
            typeAccountPayer={'-'}
            keyPixPayer={state?.keyPix || '-'}
            nameRecipient={dataSendPix?.name || '-'}
            docRecipient={dataSendPix?.document || '-'}
            bankRecipient={dataSendPix?.bank || '-'}
            agencyRecipient={dataSendPix?.agency || '-'}
            accountRecipient={dataSendPix?.account || '-'}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalPix
