import { IconStar } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useListContacts } from '@/services/PixApi'
import React, { useEffect } from 'react'

interface ListingPageTransfer {}

const ListingPageTransfer: React.FC<ListingPageTransfer> = () => {
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

  // const [openModalDeleteContact, setOpenModalDeleteContact] =
  //   useState<boolean>(false)

  // const sortedData = data?.sort((a, b) => a.name.localeCompare(b.name))
  // const filteredData = sortedData?.filter((contato) =>
  //   contato.name.toLowerCase().startsWith('')
  // )

  return (
    // <>
    //   <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
    //     <AccordionItem value="item-1" className="border-0">
    //       <AccordionTrigger className="w-[200px] gap-2">
    //         <h2 className="text-base font-medium">Meus contatos</h2>
    //         <ChevronDown size={24} className="transition-transform duration-300" />
    //       </AccordionTrigger>
    //       <AccordionContent>
    //         {filteredData?.map(({ name, key: Pix }, index) => {
    //           const firstLetter = name.charAt(0).toUpperCase()
    //           const isFirstOfLetter =
    //             index === 0 ||
    //             name.charAt(0).toUpperCase() !==
    //               filteredData[index - 1].name.charAt(0).toUpperCase()

    //           return (
    //             <React.Fragment key={index}>
    //               {isFirstOfLetter && (
    //                 <h4 className="text-lg font-bold">{firstLetter}</h4>
    //               )}
    //               <Contact
    //                 name={name}
    //                 openModal={setOpenModalDeleteContact}
    //                 keyPix={Pix}
    //               />
    //             </React.Fragment>
    //           )
    //         })}
    //       </AccordionContent>
    //     </AccordionItem>
    //   </Accordion>
    //   <ModalDefault
    //     title="Confirmação de exclusão"
    //     body={<p>Tem certeza que deseja excluir a chave Pix?</p>}
    //     ArrayButton={
    //       <>
    //         <Button onClick={() => {}} className="bg-[#008000] text-base">
    //           Sim
    //         </Button>
    //         <Button
    //           onClick={() => setOpenModalDeleteContact(false)}
    //           className="bg-[#FF0000] text-base"
    //         >
    //           Não
    //         </Button>
    //       </>
    //     }
    //     openModal={openModalDeleteContact}
    //     setOpenModal={setOpenModalDeleteContact}
    //   />
    // </>
    <article>
      {isLoading ? (
        <Skeleton className="h-12 w-full rounded-lg" />
      ) : (
        <>
          {(myContatcs ?? []).length < 1 ? (
            <h4 className="flex items-center gap-3 rounded-md border-[1px] border-system-cinza/25 p-2 text-lg text-system-cinza">
              <IconStar className="size-5 fill-transparent stroke-system-cinza/50" />
              Não há contatos salvos!
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

export default ListingPageTransfer
