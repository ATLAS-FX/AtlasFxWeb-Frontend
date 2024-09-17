import { IconPaperPlane } from '@/components/icons'
import { ButtonAtlas, Container, Title } from '@/components/layout'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useListContacts } from '@/services/PixApi'
import { formattedDoc } from '@/utils/GenerateFormatted'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransferForm from './TransferForm'
import TransferList from './TransferList'
import TransferStep from './TransferStep'

const Transfer: React.FC = () => {
  const navigate = useNavigate()
  const { data: listContacts, isLoading, isError } = useListContacts()
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
    <Container>
      <Title
        title="Transferir"
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
        <Separator className="w-[52%] bg-secondary-default" />
      </div>
      {stateForm.step === 0 && isLoading ? (
        <Skeleton className="h-8 w-5/12 max-w-[1330px] rounded-md" />
      ) : (
        <TransferList data={listContacts || []} />
      )}
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
            <Separator className="w-[52%] bg-secondary-default" />
          </div>
          <TransferStep step={stateForm} setStep={setStateForm} />
        </>
      )}
    </Container>
  )
}

export default Transfer
