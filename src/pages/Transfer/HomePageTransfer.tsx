import { IconTransfer } from '@/components/icons'
import { ButtonAtlas, Container, Title } from '@/components/layout'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingPageTransfer from './ListingPageTransfer'
import FormPageTransfer from './FormPageTransfer'
import CheckPageTransfer from './CheckPageTransfer'
import { SendPixType } from '@/types/PixType'
import { TransferStateType } from '@/types/StatesType'

const HomePageTransfer: React.FC = () => {
  const navigate = useNavigate()
  const [dataSendTransfer, setDataSendTransfer] = useState<SendPixType | undefined>()
  const [flowTransfer, setFlowTransfer] = useState<TransferStateType>({
    step: 0,
    save: 0,
    bank: '',
    pwd: '',
    agency: '',
    account: '',
    amount: '',
    typeAccount: '',
    name: '',
    docType: '',
    typeTED: '',
    doc: '',
    desc: '',
    modalTransfer: false
  })

  return (
    <Container>
      <Title
        title="Transferir"
        subtitle="Transfira sem dor de cabeça aqui!"
        back={() => {
          flowTransfer.step === 0
            ? navigate(-1)
            : setFlowTransfer((prev) => ({
                step: prev.step - 1,
                save: 0,
                pwd: '',
                bank: '',
                agency: '',
                account: '',
                amount: '',
                typeAccount: '',
                name: '',
                docType: '',
                typeTED: '',
                doc: '',
                desc: '',
                modalTransfer: false
              }))
        }}
      />
      {flowTransfer.step === 0 && (
        <div className="flex justify-end">
          <ButtonAtlas
            classButton="p-2 hover:bg-primary-hover hover:text-white transition-all duration-300 ease-in-out"
            classDiv="text-xs"
            key="transfer"
            title="Nova transferência"
            icon={IconTransfer}
            click={() => setFlowTransfer({ ...flowTransfer, step: 1 })}
          />
        </div>
      )}
      {flowTransfer.step === 0 && <ListingPageTransfer />}
      {flowTransfer.step === 1 && (
        <FormPageTransfer form={flowTransfer} setForm={setFlowTransfer} />
      )}
      {flowTransfer.step >= 2 && (
        <CheckPageTransfer
          flow={flowTransfer}
          setFlow={setFlowTransfer}
          sendTransfer={dataSendTransfer}
          setSendTransfer={setDataSendTransfer}
        />
      )}
    </Container>
  )
}

export default HomePageTransfer
