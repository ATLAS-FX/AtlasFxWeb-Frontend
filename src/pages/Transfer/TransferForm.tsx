import { ButtonNext } from '@/components/Buttons/ButtonNext'
import MaskedInput from '@/components/layout/Input/MaskedInput'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { ListBank } from '@/utils/ListBank'
import { ListMask } from '@/utils/ListMask'
import { Check } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface TransferFormProps {
  form: {
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
  }
  setForm: Dispatch<
    SetStateAction<{
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
    }>
  >
}

interface Bank {
  ispb: string
  name: string
  code?: number
  fullName: string
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
      },
      {
        title: 'Depósito',
        value: 'deposito'
      },
      {
        title: 'Pagamento',
        value: 'pagamento'
      },
      {
        title: 'Garantida',
        value: 'garantida'
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

  const [listBanks, setListBanks] = useState<Bank[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const { data: Banks, isLoading } = useQuery('list-banks', async () => {
    const res = await api.get('https://brasilapi.com.br/api/banks/v1')
    return res.data
  })

  useEffect(() => {
    if (Banks) {
      const sortedBanks = Banks.filter((bank: Bank) => bank.name) // Filter out banks with undefined names
        .sort((a: Bank, b: Bank) => a.name.localeCompare(b.name))
      setListBanks(sortedBanks)
    }
  }, [Banks])

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const isFormValid = Object.entries(form)
    .filter(([key]) => key !== 'amount' && key !== 'desc')
    .every(([, value]) => value !== '')

  return (
    <>
      <div className="mx-auto flex w-10/12 flex-col items-center gap-4 py-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="flex">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full rounded-xl border-[1px] border-colorPrimary-500 bg-transparent px-4 py-6 text-start text-base font-medium"
            >
              {isLoading
                ? 'Carregando lista de bancos'
                : form.bank.trim() === ''
                  ? 'Banco'
                  : `Banco: ${truncateString(form.bank, 26)}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Command>
              <CommandInput placeholder="Pesquise pelo banco..." />
              <CommandList>
                <CommandEmpty>Nenhum banco listado.</CommandEmpty>
                <CommandGroup className="py-4">
                  {listBanks.map(({ name }, number: number) => (
                    <CommandItem
                      key={`${name ? name + number : number}`}
                      className="w-full rounded-none border-b-2 border-colorSecondary-500 py-4"
                      value={name}
                      onSelect={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          bank: e
                        }))
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          name === form.bank ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex w-full items-center justify-between gap-4">
          <MaskedInput
            className="h-12 w-4/12 rounded-xl border-[1px] border-colorPrimary-500 px-4 text-base font-medium"
            mask={'999999'}
            placeholder="Agência"
            value={form.agency}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                agency: e.target.value.replace(/\D/g, '')
              }))
            }
          />
          <MaskedInput
            className="h-12 w-8/12 rounded-xl border-[1px] border-colorPrimary-500 px-4 text-base font-medium"
            mask={'9999999-9'}
            placeholder="Conta"
            value={form.account}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                account: e.target.value.replace(/\D/g, '')
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
                <>
                  <SelectItem
                    key={`${item.value + number}`}
                    value={item.value}
                    className="py-2 text-base font-medium"
                  >
                    {item.title}
                  </SelectItem>
                  <Separator className="bg-colorSecondary-500" />
                </>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="rounded-xl border-colorPrimary-500 p-6 text-base font-medium"
          placeholder="Nome completo ou razão social do titular"
          type="text"
          min={0}
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value
            }))
          }
        />
        <div className="flex w-full items-center justify-between gap-4">
          <Select
            onValueChange={(e) =>
              setForm((prev) => ({
                ...prev,
                docType: e
              }))
            }
          >
            <SelectTrigger className="h-12 w-4/12 rounded-xl border-colorPrimary-500 px-4 text-base font-medium">
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
          <MaskedInput
            className="h-12 w-8/12 rounded-xl border-[1px] border-colorPrimary-500 px-4 text-base font-medium"
            mask={ListMask.find((e) => e.key === form.docType)?.mask || ''}
            placeholder="Número do documento"
            value={form.doc}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                doc: e.target.value.replace(/\D/g, '')
              }))
            }
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
