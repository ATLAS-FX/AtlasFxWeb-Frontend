import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { useAdm } from '@/contexts/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExtractResum from './ExtractResum'
import FilterPage from './FilterPage'

const Extract: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAdm()

  const [filterOptions, setFilterOptions] = useState<{
    stepPage: number
    period: number
    type: string
    start: string
    end: string
  }>({ stepPage: 0, period: 0, type: '', start: '', end: '' })

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
                type: ''
              })
        }}
      />
      {filterOptions.stepPage === 0 && (
        <ExtractResum data={groupedByDate} setAction={setFilterOptions} />
      )}
      {filterOptions.stepPage === 1 && (
        <FilterPage state={filterOptions} setState={setFilterOptions} />
      )}
    </AdminContainer>
  )
}

export default Extract
