import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { SendPixType } from '@/types/PixType'
import { TransferStateType } from '@/types/StatesType'
import { formattedDoc, formattedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalTransfer {
  state: TransferStateType
  setState: Dispatch<SetStateAction<TransferStateType>>
  sendTransfer: SendPixType | undefined
  transferFunc: () => void
  loadTransfer: boolean
}

const ModalTransfer: React.FC<ModalTransfer> = ({
  state,
  setState,
  sendTransfer,
  transferFunc,
  loadTransfer
}) => {
  return (
    <Dialog
      open={state.modalTransfer}
      onOpenChange={() => setState({ ...state, modalTransfer: false })}
    >
      <DialogContent
        className={cn(
          'w-fit gap-4 rounded-xl bg-white',
          state.step >= 4 && 'min-w-[762px]',
          state.step <= 2 && 'min-h-[442px] ',
          state.step === 3 && 'h-fit w-[348px]'
        )}
      >
        {state.step === 2 && (
          <ModalConfirm
            key="confirm-modal"
            back={() =>
              state.step === 2
                ? setState({
                    ...state,
                    step: 0,
                    pwd: '',
                    amount: '',
                    save: 0,
                    desc: '',
                    modalTransfer: false
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
                    {state?.name || ''}
                  </label>
                </div>
                <h4 className="font-medium text-system-cinza">Destinatário</h4>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">Nome:</label>
                  <span>{state?.name || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">CPF:</label>
                  <span>{state?.doc || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Instituição:
                  </label>
                  <span>{state?.bank || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">Conta:</label>
                  <span>{state?.account || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Agência:
                  </label>
                  <span>{state?.agency || ''}</span>
                </div>
                {/* <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Chave Pix:
                  </label>
                  <span>
                    {state?.keyPix.length > 28
                      ? `${state?.keyPix.substring(0, 28)}...`
                      : state?.keyPix}
                  </span>
                </div> */}
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
            handleFunc={transferFunc}
            loading={loadTransfer}
          />
        )}
        {state.step === 4 && (
          <ModalSuccess
            key="success-modal"
            title={sendTransfer?.success ?? ''}
            back={() => setState({ ...state, step: 3 })}
            amount={`R$ ${formattedPrice(state?.amount) ?? 'R$ 0,00'}`}
            downloadPDF={() => console.log('download')}
            redirect="/transfer"
            typeTransfer={sendTransfer?.response?.category ?? '-'}
            idTransfer={sendTransfer?.response?.transactionId ?? '-'}
            namePayer={
              sendTransfer?.response?.transactionData?.clientFantasyName ?? '-'
            }
            docPayer={
              formattedDoc(sendTransfer?.response?.account?.documentNumber ?? '-') ??
              '-'
            }
            bankPayer={
              sendTransfer?.response?.transactionData?.recept_ispb_bank ?? '-'
            }
            typeAccountPayer={
              sendTransfer?.response?.transactionData?.accountType ?? '-'
            }
            nameRecipient={
              sendTransfer?.response?.transactionData?.recept_name ?? '-'
            }
            docRecipient={
              formattedDoc(
                sendTransfer?.response?.transactionData?.recept_cpf_cnpj ?? '-'
              ) ?? '-'
            }
            bankRecipient={sendTransfer?.response?.transactionData?.bankName ?? '-'}
            agencyRecipient={
              sendTransfer?.response?.transactionData?.pixResponse?.account
                ?.agency ?? '-'
            }
            accountRecipient={
              sendTransfer?.response?.transactionData?.pixResponse?.account
                ?.number ?? '-'
            }
            keyPixPayer={
              sendTransfer?.response?.transactionData?.pixResponse?.key ?? '-'
            }
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalTransfer
