import { Container, Title } from '@/components/layout'
import { useAtlas } from '@/contexts/AtlasContext'
import { ExtractStateType } from '@/types/StatesType'
import { RegisterPixType } from '@/types/userType'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterPageExtract from './FilterPageExtract'
import SummaryPageExtract from './SummaryPageExtract'

const HomePageExtract: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAtlas()

  const [filterOptions, setFilterOptions] = useState<ExtractStateType>({
    stepPage: 0,
    period: 0,
    type: 'in',
    startDate: format(new Date().setDate(new Date().getDate() - 15), 'dd-MM-yyyy', {
      locale: ptBR
    }),
    endDate: format(new Date(), 'dd-MM-yyyy', { locale: ptBR }),
    startHour: format(new Date().setHours(0, 0, 0, 0), 'HH:mm:ss', { locale: ptBR }),
    endHour: format(new Date().setHours(23, 59, 59, 999), 'HH:mm:ss', {
      locale: ptBR
    }),
    controlIn: 0,
    controlOut: 0,
    filterModal: false,
    firstDate: '',
    lastDate: ''
  })
  type GroupedTransactions = Record<string, RegisterPixType[]>

  const groupedByDate = user.releases.reduce((acc, transaction) => {
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

  const sumBySend = (data: Record<string, RegisterPixType[]>) => {
    return Object.values(data).reduce(
      (acc, group) => {
        group.forEach((release) => {
          if (release.send === 1) {
            acc.controlOut += release.amount
          } else if (release.send === 0) {
            acc.controlIn += release.amount
          }

          const createdDate = new Date(release.created)
          if (!acc.firstDate || createdDate < new Date(acc.firstDate)) {
            acc.firstDate = release.created
          }
          if (!acc.lastDate || createdDate > new Date(acc.lastDate)) {
            acc.lastDate = release.created
          }
        })
        return acc
      },
      { controlIn: 0, controlOut: 0, firstDate: '', lastDate: '' }
    )
  }

  useEffect(() => {
    const result = sumBySend(groupedByDate)
    setFilterOptions((prev) => ({ ...prev, ...result }))
  }, [])

  useEffect(() => {
    console.log(filterOptions)
  }, [filterOptions])

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
                type: 'in',
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
                firstDate: '',
                lastDate: '',
                filterModal: false
              })
        }}
      />
      {filterOptions.stepPage === 0 && (
        <SummaryPageExtract
          data={groupedByDate}
          action={filterOptions}
          setAction={setFilterOptions}
        />
      )}
      {filterOptions.stepPage === 1 && (
        <FilterPageExtract state={filterOptions} setState={setFilterOptions} />
      )}
    </Container>
  )
}

export default HomePageExtract
