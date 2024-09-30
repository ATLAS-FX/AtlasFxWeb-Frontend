import { IconStar } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useListContacts } from '@/services/PixApi'
import { useEffect } from 'react'

interface ContactsPagePixProps {}

const ContactsPagePix: React.FC<ContactsPagePixProps> = ({}) => {
  const { data: myContatcs, isLoading, isError } = useListContacts()

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar lista de contatos.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <article>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <>
          {(myContatcs ?? []).length < 1 ? (
            <h4 className="flex items-center gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
              Sem Contatos
            </h4>
          ) : (
            <h4 className="flex items-center gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
              <IconStar className="size-5 fill-transparent stroke-system-cinza" />
              Contatos
            </h4>
          )}
        </>
      )}
    </article>
  )
}

export default ContactsPagePix
