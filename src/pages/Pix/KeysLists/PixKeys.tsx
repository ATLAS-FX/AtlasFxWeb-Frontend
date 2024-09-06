import { Container, Title } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import CreatePix from './CreatePix'
import KeyPixSuccess from './KeysSuccess'
import ListOfKeys from './ListOfKeys'

const PixKeys: React.FC = () => {
  const navigate = useNavigate()
  const [stepKeyPix, setStepKeyPix] = useState<number>(0)

  const {
    data: listMyKeys,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: 'list-pix-keys',
    queryFn: async () => {
      const res = await PixApi.listPixKeys()
      return res
    }
  })

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError, listMyKeys])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <Container>
          <Title title="Minhas Chaves Pix" back={() => navigate(-1)} />
          {stepKeyPix === 0 && (
            <>
              <Button
                onClick={() => setStepKeyPix(1)}
                className="my-2 h-10 rounded-xl border-2 border-primary-default bg-transparent text-lg font-semibold text-primary-default transition-transform duration-300 hover:bg-primary-default hover:text-white"
              >
                Criar nova chave Pix
              </Button>
              <div className="flex flex-row-reverse">
                <Separator className="w-[52%] bg-secondary-default" />
              </div>
              <ListOfKeys
                refetch={refetch}
                listMyKeys={listMyKeys ? listMyKeys : []}
              />
            </>
          )}
          {stepKeyPix === 1 && <CreatePix refetch={refetch} step={setStepKeyPix} />}
          {stepKeyPix === 2 && <KeyPixSuccess step={setStepKeyPix} />}
        </Container>
      )}
    </>
  )
}

export default PixKeys
