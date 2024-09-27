import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { PaymentType } from '@/types/PaymentType'
import { formattedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPaymentProps {
  state: {
    step: number
    type: string
    textValue: string
    pwdCode: string
    stateModal: boolean
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      type: string
      textValue: string
      pwdCode: string
      stateModal: boolean
    }>
  >
  data: PaymentType | undefined
  ConsultPaymentFunc: () => void
  SendPaymentFunc: () => void
}

const ModalPayment: React.FC<ModalPaymentProps> = ({
  state,
  setState,
  data,
  ConsultPaymentFunc,
  SendPaymentFunc
}) => {
  const { user } = useAtlas()
  // const idTransaction = generateHash()

  // const handleDownloadPDF = (type: string) => {
  //   const doc =
  //     type === 'boleto' ? (
  //       <PDFBoleto
  //         document={formattedDoc(document, 'cnpj') || ''}
  //         amount={formatedPrice(amount) || ''}
  //         name={name}
  //         barcode={barcode}
  //         bank={'-'}
  //         agency={'-'}
  //         account={'-'}
  //         idTransaction={idTransaction}
  //         date={formattedDate(new Date().toString())}
  //       />
  //     ) : (
  //       <PDFPix
  //         documentSent={formattedDoc(document, 'cnpj') || ''}
  //         amount={formatedPrice(amount) || ''}
  //         nameSent={name}
  //         bankSent={'-'}
  //         agencySent={'-'}
  //         accountSent={'-'}
  //         nameReceiver={'-'}
  //         documentReceiver={'-'}
  //         bankReceiver={'-'}
  //         agencyReceiver={'-'}
  //         accountReceiver={'-'}
  //         idTransaction={idTransaction}
  //         date={formattedDate(new Date().toString())}
  //       />
  //     )

  //   downloadPDF(doc)
  // }

  return (
    <Dialog
      open={state.stateModal}
      onOpenChange={() => setState({ ...state, stateModal: false })}
    >
      <DialogContent className={cn('max-w-[412px] gap-4 rounded-xl bg-white')}>
        {state.step === 1 && (
          <ModalConfirm
            key="confirm-modal"
            back={() => setState({ ...state, step: 1 })}
            title={'Confira as informações do pagamento'}
            contain={
              <div className="flex flex-col gap-4 text-sm font-normal text-system-cinza">
                <div className="m-auto flex w-5/6 flex-col items-center rounded-md border-[1px] border-system-cinza/25 p-4">
                  <h4 className="text-base font-semibold">
                    {`R$ ${formattedPrice(user?.amount || '0,00')?.toString()}`}
                  </h4>
                  <label className="font-bold text-primary-default">
                    {data?.owner || ''}
                  </label>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">
                    Nome do destinatário:
                  </label>
                  <span>{data?.owner || ''}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-primary-default">CPF:</label>
                  <span>{data?.document || ''}</span>
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
                    {state?.type === 'boleto' ? 'Código de barras:' : 'Chave Pix:'}
                  </label>
                  <span>
                    {state?.textValue.length > 28
                      ? `${state?.textValue.substring(0, 28)}...`
                      : state?.textValue}
                  </span>
                </div>
              </div>
            }
            handleFunc={ConsultPaymentFunc}
          />
        )}
        {state.step === 2 && (
          <ModalPwd
            key="pwd-modal"
            back={() => setState({ ...state, step: 2 })}
            title={'Insira sua senha'}
            subtitle={'Sua senha é a mesma da sua conta'}
            token={() => setState({ ...state, type: 'token' })}
            handleFunc={SendPaymentFunc}
          />
        )}
        {state.step === 3 && (
          <ModalSuccess
            key="success-modal"
            title={'Sucesso!'}
            amount={''}
            back={() => setState({ ...state, step: 3 })}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalPayment
