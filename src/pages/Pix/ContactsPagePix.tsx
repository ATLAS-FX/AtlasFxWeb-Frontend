import { IconStar, IconTrash } from '@/components/icons'
import Tooltip from '@/components/layout/Tooltip/Tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useDeleteContact, useListContacts } from '@/services/PixApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { useEffect, useState } from 'react'
import ModalContact from './ModalContact'

interface ContactsPagePixProps {}

const ContactsPagePix: React.FC<ContactsPagePixProps> = () => {
  const { data: myContatcs, isLoading, isError, refetch } = useListContacts()
  const { mutate: deleteContact, isLoading: loadContact } = useDeleteContact()

  const [contact, setContact] = useState<{
    step: number
    stateModal: boolean
    idContact: string
  }>({
    step: 0,
    stateModal: false,
    idContact: ''
  })

  const handleDelete = async () => {
    deleteContact(
      {
        id: contact.idContact
      },
      {
        onSuccess: (res) => {
          setContact({
            ...contact,
            idContact: '',
            stateModal: false
          })
          refetch()
          toast({
            variant: 'success',
            title: 'Seu chave pix foi deletada sucesso!',
            description: res.success
          })
        },
        onError: (error: unknown) => {
          const { response } = error as ErrorResponse
          toast({
            variant: 'destructive',
            title: response.data.error,
            description: 'repita o processo.'
          })
        }
      }
    )
  }

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
        <Skeleton className="h-12 w-full rounded-lg" />
      ) : (
        <>
          {(myContatcs ?? []).length < 1 ? (
            <h4 className="flex items-center gap-3 rounded-md border-2 border-system-cinza/25 px-4 py-6 text-sm text-system-cinza">
              <IconStar className="size-5 fill-transparent stroke-system-cinza/50" />
              Não há contatos salvos!
            </h4>
          ) : (
            <div className="flex flex-col gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
              <h4 className="flex items-center gap-3 p-2 text-lg text-system-cinza">
                <IconStar className="size-5 fill-transparent stroke-system-cinza" />
                Contatos
              </h4>
              {myContatcs &&
                myContatcs.map(({ id, key, name }, number) => (
                  <div
                    key={`contact-${number}+${id}`}
                    className="flex justify-between text-primary-default"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="capitalize">
                          {name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="flex flex-col gap-1">
                        <span className="text-sm">{name}</span>
                        <span className="text-sm text-system-cinza">{key}</span>
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 fill-primary-default">
                      <Tooltip
                        children={
                          <div
                            onClick={() =>
                              setContact({
                                ...contact,
                                stateModal: true,
                                idContact: id
                              })
                            }
                          >
                            <IconTrash className="size-4 hover:fill-primary-hover" />
                          </div>
                        }
                        content="Deletar contato"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
      <ModalContact
        state={contact}
        setState={setContact}
        funcDelete={() => handleDelete()}
        loadDelete={loadContact}
      />
    </article>
  )
}

export default ContactsPagePix
