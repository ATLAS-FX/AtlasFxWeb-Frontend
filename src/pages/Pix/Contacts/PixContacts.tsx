import { Container, Title } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { ContactsPixType } from '@/types/PixType'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ListContact from './ListContacts'

const PixContacts: React.FC = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<ContactsPixType[]>([])

  const {
    data: listMyContatcs,
    isLoading,
    isError
  } = useQuery({
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
  }, [isError, listMyContatcs])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <Container>
          <Title title="Meus Contatos Salvos" back={() => navigate(-1)} />
          <ListContact data={data} />
        </Container>
      )}
    </>
  )
}

export default PixContacts
