import { ButtonNext, MaskedInput } from '@/components/layout'
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
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { TransferStateType } from '@/types/StatesType'
import { ListBank, typeAccount, typeDoc, typeTed } from '@/utils/FormTransfer'
import { ListMask } from '@/utils/ListMask'
import { Check, Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface FormPageTransferProps {
  form: TransferStateType
  setForm: Dispatch<SetStateAction<TransferStateType>>
}

interface Bank {
  ispb: string
  name: string
  code?: number
  fullName: string
}

const FormPageTransfer: React.FC<FormPageTransferProps> = ({ form, setForm }) => {
  const listForm = {
    bank: ListBank,
    typeAccount: typeAccount,
    doc: typeDoc,
    typeTed: typeTed
  }

  const [listBanks, setListBanks] = useState<Bank[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const { data: Banks, isLoading } = useQuery('list-banks', async () => {
    const res = await api.get('https://brasilapi.com.br/api/banks/v1')
    return res.data
  })

  useEffect(() => {
    if (Banks) {
      const sortedBanks = Banks.filter((bank: Bank) => bank.name).sort(
        (a: Bank, b: Bank) => a.name.localeCompare(b.name)
      )
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
    .filter(([key]) => key !== 'amount' && key !== 'desc' && key !== 'pwd')
    .every(([, value]) => value !== '')

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <div className="relative flex w-full flex-col gap-1">
          <label
            htmlFor="bank_button"
            className={cn(
              'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
            )}
          >
            Banco:
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              asChild
              className="focus-visible: flex hover:bg-system-neutro focus:outline-none focus:ring-2 focus:ring-system-cinza/50 focus-visible:ring-2 focus-visible:ring-system-cinza/50"
            >
              <Button
                variant="outline"
                role="combobox"
                id="bank_button"
                aria-expanded={open}
                className="h-11 w-full rounded-md border-[1px] border-system-cinza/25 bg-transparent p-2 text-base font-medium shadow-none"
              >
                {isLoading ? (
                  <Loader2 className="size-6 animate-spin text-gray-500" />
                ) : form.bank.trim() === '' ? (
                  ''
                ) : (
                  `Banco: ${truncateString(form.bank, 26)}`
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Command>
                <CommandInput placeholder="Pesquise pelo banco..." />
                <CommandList>
                  <CommandEmpty>Nenhum banco listado.</CommandEmpty>
                  <CommandGroup className="p-0">
                    {listBanks.map(({ name }, number: number) => (
                      <CommandItem
                        key={`${name ? name + number : number}`}
                        className="w-full rounded-none border-b-[1px] border-system-cinza/10 py-3"
                        value={name}
                        onSelect={(e) => {
                          setForm({
                            ...form,
                            bank: e
                          })
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
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="relative flex w-4/12 flex-col gap-1">
            <label
              htmlFor="agency_maks"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Agência:
            </label>
            <MaskedInput
              mask={'999999'}
              id="agency_maks"
              // placeholder='Agência'
              value={form.agency}
              onChange={(e) =>
                setForm({
                  ...form,
                  agency: e.target.value.replace(/\D/g, '')
                })
              }
            />
          </div>
          <div className="relative flex w-8/12 flex-col gap-1">
            <label
              htmlFor="account_mask"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Conta:
            </label>
            <MaskedInput
              mask={'9999999-9'}
              // placeholder="Conta"
              id="account_mask"
              value={form.account}
              onChange={(e) =>
                setForm({
                  ...form,
                  account: e.target.value.replace(/\D/g, '')
                })
              }
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="relative flex w-6/12 flex-col gap-1">
            <label
              htmlFor="type_account"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Tipo de Conta:
            </label>
            <Select
              onValueChange={(e) =>
                setForm({
                  ...form,
                  typeAccount: e
                })
              }
            >
              <SelectTrigger
                className="h-11 rounded-md border-system-cinza/25 bg-transparent p-4 text-base font-medium shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-system-cinza/50"
                id="type_account"
              >
                <SelectValue
                //  placeholder="Tipo de conta"
                />
              </SelectTrigger>
              <SelectContent className="w-[95%] px-4 py-2">
                <SelectGroup>
                  {listForm.typeAccount.map((item, number) => (
                    <>
                      <SelectItem
                        key={`${item.value + number}`}
                        value={item.value}
                        className="rounded-none border-b-[1px] border-system-cinza/25 py-3 text-base font-medium"
                      >
                        {item.title}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="relative flex w-6/12 flex-col gap-1">
            <label
              htmlFor="type_ted"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Tipo de TED:
            </label>
            <Select
              onValueChange={(e) =>
                setForm({
                  ...form,
                  typeTED: e
                })
              }
            >
              <SelectTrigger
                className="h-11 rounded-md border-system-cinza/25 bg-transparent p-4 px-4 text-base font-medium shadow-none"
                id="type_ted"
              >
                <SelectValue
                //  placeholder="Documento"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listForm.typeTed.map((item, number) => (
                    <SelectItem key={`${item.value + number}`} value={item.value}>
                      {truncateString(item.title, 72)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-1">
          <label
            htmlFor="input_name"
            className={cn(
              'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
            )}
          >
            Nome completo ou razão social do titular:
          </label>
          <Input
            className="border-system-cinza/25 focus:outline-none focus:ring-2 focus:ring-system-cinza/50"
            // placeholder="Nome completo ou razão social do titular"
            type="text"
            id="input_name"
            min={0}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="relative flex w-4/12 flex-col gap-1">
            <label
              htmlFor="doc_type"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Documento:
            </label>
            <Select
              onValueChange={(e) =>
                setForm({
                  ...form,
                  docType: e
                })
              }
            >
              <SelectTrigger
                className="h-11 rounded-md border-system-cinza/25 bg-transparent p-4 px-4 text-base font-medium shadow-none"
                id="doc_type"
              >
                <SelectValue
                //  placeholder="Documento"
                />
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
          </div>
          <div className=" relative flex w-8/12 flex-col gap-1">
            <label
              htmlFor="number_doc"
              className={cn(
                'absolute -top-3 left-4 bg-system-neutro px-4 py-1 text-sm font-medium text-system-cinza/75'
              )}
            >
              Número do documento:
            </label>
            <MaskedInput
              className="h-11 rounded-md border-[1px] border-system-cinza/25 bg-transparent p-4 px-4 text-base font-medium shadow-none focus:outline-none focus:ring-2 focus:ring-system-cinza/50"
              mask={ListMask.find((e) => e.key === form.docType)?.mask || ''}
              id="number_doc"
              // placeholder="Número do documento"
              value={form.doc}
              onChange={(e) =>
                setForm({
                  ...form,
                  doc: e.target.value.replace(/\D/g, '')
                })
              }
            />
          </div>
        </div>
      </section>
      <div className="mt-1 flex justify-end">
        <ButtonNext
          title="Prosseguir"
          disabled={!isFormValid}
          func={() => setForm({ ...form, step: 2 })}
        />
      </div>
    </>
  )
}

export default FormPageTransfer
