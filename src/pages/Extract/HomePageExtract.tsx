import { Container, Title } from '@/components/layout'
import { toast } from '@/components/ui/use-toast'
import { useExtractInfo } from '@/services/ExtractApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { ExtractStateType } from '@/types/StatesType'
import { RegisterPixType } from '@/types/userType'
import { formattedDateMachine } from '@/utils/GenerateFormatted'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SummaryPageExtract from './SummaryPageExtract'

const HomePageExtract: React.FC = () => {
  const navigate = useNavigate()
  type GroupedTransactions = Record<string, RegisterPixType[]>

  const [transactions, setTransactions] = useState<RegisterPixType[]>([])
  const [groupedByDate, setGroupedByDate] = useState<
    Record<string, RegisterPixType[]>
  >(Object.create(null))
  const [filterOptions, setFilterOptions] = useState<ExtractStateType>({
    stepPage: 0,
    period: 0,
    type: null,
    startDate: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    endDate: new Date().toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    }),
    startHour: '00:00:00',
    endHour: '23:59:59',
    controlIn: 0,
    controlOut: 0,
    filterModal: false
  })

  const { mutate: extractInfo, isLoading, isError } = useExtractInfo()

  const handleFilterExtract = () => {
    extractInfo(
      {
        start: `${formattedDateMachine(filterOptions.startDate)} ${filterOptions?.startHour}`,
        end: `${formattedDateMachine(filterOptions.endDate)} ${filterOptions?.endHour}`,
        ...(filterOptions.type && { type: filterOptions.type })
      },
      {
        onSuccess: (data: RegisterPixType[]) => setTransactions(data),
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'Repita o processo.'
          })
        }
      }
    )
  }

  const groupTransactionsByDate = (transactions: RegisterPixType[]) => {
    return transactions.reduce((acc, transaction) => {
      const dateA = new Date(transaction.created)
        .toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo'
        })
        .split(' ')[0]

      if (!acc[dateA]) {
        acc[dateA] = []
      }
      acc[dateA].push(transaction)
      return acc
    }, {} as GroupedTransactions)
  }

  const calculateTotals = (groupedData: Record<string, RegisterPixType[]>) => {
    return Object.values(groupedData).reduce(
      (acc, group) => {
        group.forEach((transaction) => {
          if (transaction.send === 1) {
            acc.controlOut += transaction.amount
          } else if (transaction.send === 0) {
            acc.controlIn += transaction.amount
          }

          const createdDate = new Date(transaction.created)
          if (!acc.firstDate || createdDate < new Date(acc.firstDate)) {
            acc.firstDate = transaction.created
          }
          if (!acc.lastDate || createdDate > new Date(acc.lastDate)) {
            acc.lastDate = transaction.created
          }
        })
        return acc
      },
      { controlIn: 0, controlOut: 0, firstDate: '', lastDate: '' }
    )
  }

  useEffect(() => {
    if (transactions.length > 0) {
      const groupedByDate = groupTransactionsByDate(transactions)
      setGroupedByDate(groupedByDate)
      const totals = calculateTotals(groupedByDate)
      setFilterOptions((prev) => ({ ...prev, ...totals }))
    }
  }, [transactions])

  useEffect(() => {
    handleFilterExtract()
  }, [])

  useEffect(() => {
    console.log('filter', filterOptions)
  }, [filterOptions])

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados de extratos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <Container>
      <Title
        title="Extrato"
        subtitle="Fique de olho nas suas movimentações e confira os comprovantes."
        back={() => {
          filterOptions.stepPage <= 0
            ? navigate(-1)
            : setFilterOptions({
                stepPage: 0,
                period: 0,
                type: '',
                startDate: format(
                  new Date().setDate(new Date().getDate() - 15),
                  'dd/MM/yyyy',
                  {
                    locale: ptBR
                  }
                ),
                endDate: format(new Date(), 'dd/MM/yyyy', { locale: ptBR }),
                startHour: format(new Date().setHours(0, 0, 0, 0), 'HH:mm:ss', {
                  locale: ptBR
                }),
                endHour: format(new Date().setHours(23, 59, 59, 999), 'HH:mm:ss', {
                  locale: ptBR
                }),
                controlIn: 0,
                controlOut: 0,
                filterModal: false
              })
        }}
      />
      {filterOptions.stepPage === 0 && (
        <SummaryPageExtract
          data={groupedByDate || {}}
          action={filterOptions}
          setAction={setFilterOptions}
          extractLoading={isLoading}
          extractFunction={handleFilterExtract}
        />
      )}
    </Container>
  )
}

export default HomePageExtract
