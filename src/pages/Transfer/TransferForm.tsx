import { ButtonNext } from '@/components/Buttons/ButtonNext'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ListBank } from '@/utils/ListBank'
import { Dispatch, SetStateAction } from 'react'

interface TransferFormProps {
  form: {
    step: number
    bank: string
    agency: string
    account: string
    typeAccount: string
    nameOrtitle: string
    doc: string
    numberDoc: string
  }
  setForm: Dispatch<
    SetStateAction<{
      step: number
      bank: string
      agency: string
      account: string
      typeAccount: string
      nameOrtitle: string
      doc: string
      numberDoc: string
    }>
  >
}

const TransferForm: React.FC<TransferFormProps> = ({ form, setForm }) => {
  const listForm = {
    bank: ListBank,
    typeAccount: [
      {
        title: 'Corrente',
        value: 'corrente'
      },
      {
        title: 'Poupança',
        value: 'poupanca'
      }
    ],
    doc: [
      {
        title: 'CPF',
        value: 'cpf'
      },
      {
        title: 'CNPJ',
        value: 'cnpj'
      }
    ]
  }

  const sortedBanks = [...listForm.bank].sort((a, b) => {
    const numA = parseInt(a.title.split(' - ')[0], 10)
    const numB = parseInt(b.title.split(' - ')[0], 10)
    return numA - numB
  })

  const isFormValid = Object.values(form).every((value) => value !== '')

  return (
    <>
      <div className="mx-auto flex w-10/12 flex-col items-center gap-4 py-2">
        <Select
          onValueChange={(e) =>
            setForm((prev) => ({
              ...prev,
              bank: e
            }))
          }
        >
          <SelectTrigger className="rounded-xl border-colorPrimary-500 p-6 text-base font-medium">
            <SelectValue placeholder="Banco" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortedBanks.map((item, number) => (
                <SelectItem key={`${item.value + number}`} value={item.value}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex w-full items-center justify-between gap-4">
          <Input
            className="w-4/12 rounded-xl border-colorPrimary-500 p-6 text-base font-medium"
            placeholder="Agencia"
            type="number"
            value={form.agency}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                agency: e.target.value
              }))
            }
          />
          <Input
            className="w-8/12 rounded-xl border-colorPrimary-500 p-6 text-base font-medium"
            placeholder="Conta"
            value={form.account}
            type="number"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                account: e.target.value
              }))
            }
          />
        </div>
        <Select
          onValueChange={(e) =>
            setForm((prev) => ({
              ...prev,
              typeAccount: e
            }))
          }
        >
          <SelectTrigger className="rounded-xl border-colorPrimary-500 p-6 text-base font-medium">
            <SelectValue placeholder="Tipo de conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {listForm.typeAccount.map((item, number) => (
                <SelectItem key={`${item.value + number}`} value={item.value}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="rounded-xl border-colorPrimary-500 p-6 text-base font-medium"
          placeholder="Nome completo ou razão social do titular"
          type="text"
          value={form.nameOrtitle}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              nameOrtitle: e.target.value
            }))
          }
        />
        <div className="flex w-full items-center justify-between gap-4">
          <Select
            onValueChange={(e) =>
              setForm((prev) => ({
                ...prev,
                doc: e
              }))
            }
          >
            <SelectTrigger className="w-4/12 rounded-xl border-colorPrimary-500 p-6 text-base font-medium">
              <SelectValue placeholder="Documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {listForm.doc.map((item, number) => (
                  <SelectItem key={`${item.value + number}`} value={item.value}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="w-8/12 rounded-xl border-colorPrimary-500 p-6 text-base font-medium"
            placeholder="Número do documento"
            type="text"
            // maxLength={form.typeAccount === 'cnpj' ? 24 : 18}
            value={form.numberDoc}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                numberDoc: e.target.value
              }))
            }}
          />
        </div>
      </div>
      <div className="flex">
        <Separator className="w-[52%] bg-colorSecondary-500" />
      </div>
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir"
          disabled={!isFormValid}
          func={() => setForm((prev) => ({ ...prev, step: 2 }))}
        />
      </div>
    </>
  )
}

export default TransferForm
