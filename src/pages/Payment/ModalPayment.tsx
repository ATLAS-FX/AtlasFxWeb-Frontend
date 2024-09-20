import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAtlas } from '@/contexts/AtlasContext'
import { cn } from '@/lib/utils'
import { PaymentType } from '@/types/PaymentType'
import { formatedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPayment {
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

const ModalPayment: React.FC<ModalPayment> = ({
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
            balance={`R$ ${formatedPrice(user?.amount || '0,00')?.toString()}`}
            nameRecipient={data?.owner || ''}
            document={data?.document || ''}
            bank={data?.bank || ''}
            agency={data?.agency || ''}
            account={data?.account || ''}
            keyValue={state?.textValue || ''}
            keyType={state?.type}
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
