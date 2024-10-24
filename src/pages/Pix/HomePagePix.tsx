import { Container, Title } from '@/components/layout'
import { Separator } from '@/components/ui/separator'
import { SendPixType } from '@/types/PixType'
import { PixStateType } from '@/types/StatesType'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactsPagePix from './ContactsPagePix'
import FlowPagePix from './FlowPagePix'
import KeyPagePix from './KeyPagePix'

const HomePagePix: React.FC = () => {
  const navigate = useNavigate()
  const [dataSendPix, setDataSendPix] = useState<SendPixType | undefined>()
  const [control, setControl] = useState<PixStateType>({
    step: 0,
    select: '',
    amount: '',
    pwd: '',
    keyPix: '',
    formatKeyPix: '',
    typekeyPix: '',
    desc: '',
    save: 0,
    modalPix: false,
    modalKey: false
  })

  return (
    <Container>
      <Title
        title="Área Pix"
        subtitle="Envie seus PIX. Simples e rápido."
        back={() =>
          control.step === 0
            ? navigate(-1)
            : control.step === 1
              ? setControl({
                  step: control.step - 1,
                  select: '',
                  amount: '',
                  pwd: '',
                  keyPix: '',
                  formatKeyPix: '',
                  typekeyPix: '',
                  desc: '',
                  save: 0,
                  modalPix: false,
                  modalKey: false
                })
              : setControl({ ...control, step: control.step - 1 })
        }
      />
      <FlowPagePix
        flow={control}
        setFlow={setControl}
        sendData={dataSendPix}
        setSendData={setDataSendPix}
      />
      {control.select !== 'flowPage' && (
        <>
          <Separator
            key="divisor-1"
            className="my-1 h-0.5 w-full bg-system-cinza/25"
          />
          <KeyPagePix />
        </>
      )}
      {control.select !== 'flowPage' && <ContactsPagePix />}
    </Container>
  )
}

export default HomePagePix
