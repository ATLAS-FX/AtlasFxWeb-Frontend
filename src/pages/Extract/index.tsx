import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { useAtlas } from '@/contexts/AtlasContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExtractResum from './ExtractResum'
import FilterPage from './FilterPage'

const Extract: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAtlas()

  const [filterOptions, setFilterOptions] = useState<{
    stepPage: number
    period: number
    type: string
    start: string
    end: string
    controlIn: number
    controlOut: number
    firstDate: string
    lastDate: string
  }>({
    stepPage: 0,
    period: 0,
    type: '',
    start: '',
    end: '',
    controlIn: 0,
    controlOut: 0,
    firstDate: '',
    lastDate: ''
  })
  type GroupedTransactions = Record<string, App.RegisterPixProps[]>

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

  const sumBySend = (data: Record<string, App.RegisterPixProps[]>) => {
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

  return (
    <AdminContainer>
      <Title
        text="Extrato"
        back={() => {
          filterOptions.stepPage <= 0
            ? navigate(-1)
            : setFilterOptions({
                stepPage: 0,
                period: 0,
                start: '',
                end: '',
                type: '',
                controlIn: 0,
                controlOut: 0,
                firstDate: '',
                lastDate: ''
              })
        }}
      />
      {filterOptions.stepPage === 0 && (
        <ExtractResum
          data={groupedByDate}
          action={filterOptions}
          setAction={setFilterOptions}
        />
      )}
      {filterOptions.stepPage === 1 && (
        <FilterPage state={filterOptions} setState={setFilterOptions} />
      )}
    </AdminContainer>
  )
}

export default Extract
