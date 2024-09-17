import { ModalConfirm, ModalPwd, ModalSuccess } from '@/components/layout'
import { Dialog } from '@/components/ui/dialog'
import { useAtlas } from '@/contexts/AtlasContext'
import { PaymentType } from '@/types/PaymentType'
import { formatedPrice } from '@/utils/GenerateFormatted'
import { Dispatch, SetStateAction } from 'react'

interface ModalPayment {
  state: {
    step: number
    type: string
    textValue: string
    pwdCode: string
    loading: boolean
  }
  setState: Dispatch<
    SetStateAction<{
      step: number
      type: string
      textValue: string
      pwdCode: string
      loading: boolean
    }>
  >
  data: PaymentType | undefined
  openModal: boolean
  setOpenModal: (value: boolean) => void
  ConsultPaymentFunc: () => void
  SendPaymentFunc: () => void
}

const ModalPayment: React.FC<ModalPayment> = ({
  state,
  setState,
  data,
  openModal,
  setOpenModal,
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
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      {state.step === 2 && (
        <ModalConfirm
          back={() => setState({ ...state, step: 1 })}
          key={state.textValue}
          title={'Confira as informações do pagamento'}
          balance={`R$ ${formatedPrice(user?.amount || '0,00')?.toString()}`}
          nameRecipient={data?.owner || ''}
          document={data?.document || ''}
          bank={data?.bank || ''}
          agency={data?.agency || ''}
          account={data?.account || ''}
          keyType={state.type}
          handleFunc={() => ConsultPaymentFunc()}
        />
      )}
      {state.step === 3 && (
        <ModalPwd
          back={() => setState({ ...state, step: 2 })}
          title={'Insira sua senha'}
          subtitle={'Sua senha é a mesma da sua conta'}
          token={() => setState({ ...state, type: 'token' })}
          handleFunc={() => SendPaymentFunc()}
        />
      )}
      {state.step === 4 && (
        <ModalSuccess
          title={'Sucesso!'}
          amount={''}
          back={() => setState({ ...state, step: 3 })}
        />
      )}
    </Dialog>
  )
}

export default ModalPayment
