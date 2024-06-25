import { ButtonAtlas } from '@/components/Buttons/ButtonAtlas'
import { IconPaperPlane } from '@/components/icons/PapelPlane'
import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { formattedDoc } from '@/utils/FormattedDoc'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import TransferForm from './TransferForm'
import TransferList from './TransferList'
import TransferStep from './TransferStep'

const Transfer: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<App.ContactsPixProps[]>([])
  const [stateForm, setStateForm] = useState<{
    step: number
    bank: string
    agency: string
    account: string
    amount: string
    typeAccount: string
    name: string
    docType: string
    doc: string
    desc: string
  }>({
    step: 0,
    bank: '',
    agency: '',
    account: '',
    amount: '',
    typeAccount: '',
    name: '',
    docType: '',
    doc: '',
    desc: ''
  })

  const { isError } = useQuery({
    queryKey: 'list-pix-keys',
    queryFn: async () => {
      const res = await PixApi.listPixContacts()
      setData(res)
      return res
    }
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <AdminContainer>
      <Title
        text="Transferir"
        back={() => {
          stateForm.step === 0
            ? navigate(-1)
            : setStateForm((prev) => ({
                step: prev.step - 1,
                bank: '',
                agency: '',
                account: '',
                amount: '',
                typeAccount: '',
                name: '',
                docType: '',
                doc: '',
                desc: ''
              }))
        }}
      />
      <h4 className="text-base font-medium">
        {stateForm.step <= 0
          ? 'Facilite suas transações com TED e P2P'
          : 'Digite os dados para transferência'}
      </h4>
      {stateForm.step === 0 && (
        <div className="flex items-center justify-center">
          <ButtonAtlas
            title="Nova transferência"
            icon={IconPaperPlane}
            classButton="w-10/12 py-0 px-4 text-shadow-3x text-lg"
            sizeIcon={48}
            click={() => setStateForm((prev) => ({ ...prev, step: 1 }))}
          />
        </div>
      )}
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      {stateForm.step === 0 && <TransferList data={data} />}
      {stateForm.step === 1 && (
        <TransferForm form={stateForm} setForm={setStateForm} />
      )}
      {stateForm.step === 2 && (
        <>
          <div className="flex flex-col gap-2 text-lg font-medium">
            <h4 className="font-normal">
              Titular: <span className="font-semibold">{stateForm.name || ''}</span>
            </h4>
            <div className="ml-8">
              <h4>
                Documento:{' '}
                <span className="font-normal">
                  {formattedDoc(stateForm.doc, stateForm.docType) || ''}
                </span>
              </h4>
              <h4>
                Banco: <span className="font-normal">{stateForm.bank || ''}</span>
              </h4>
              <h4>
                Tipo de conta:{' '}
                <span className="font-normal">{stateForm.typeAccount || ''}</span>
              </h4>
              <div className="flex gap-2">
                <h4>
                  Agência:{' '}
                  <span className="font-normal">{stateForm.agency || ''}</span>
                </h4>
                -
                <h4>
                  Conta:{' '}
                  <span className="font-normal">{stateForm.account || ''}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <Separator className="w-[52%] bg-colorSecondary-500" />
          </div>
          <TransferStep step={stateForm} setStep={setStateForm} />
        </>
      )}
    </AdminContainer>
  )
}

export default Transfer
