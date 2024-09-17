import { Container, Title } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useListContacts } from '@/services/PixApi'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListContact from './ListContacts'

const PixContacts: React.FC = () => {
  const navigate = useNavigate()
  const { data: listMyContatcs, isLoading, isError } = useListContacts()

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError, listMyContatcs])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <Container>
          <Title title="Meus Contatos Salvos" back={() => navigate(-1)} />
          <ListContact data={listMyContatcs || []} />
        </Container>
      )}
    </>
  )
}

export default PixContacts
