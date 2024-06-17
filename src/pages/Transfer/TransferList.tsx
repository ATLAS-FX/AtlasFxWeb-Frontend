import Contact from '@/components/layout/Contact'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface TransferListProps {
  data: App.ContactsPixProps[]
}

const TransferList: React.FC<TransferListProps> = ({ data }) => {
  const [openModalDeleteContact, setOpenModalDeleteContact] =
    useState<boolean>(false)

  const sortedData = data?.sort((a, b) => a.name.localeCompare(b.name))
  const filteredData = sortedData?.filter((contato) =>
    contato.name.toLowerCase().startsWith('')
  )
  return (
    <>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="w-[200px] gap-2">
            <h2 className="text-base font-medium">Meus contatos</h2>
            <ChevronDown size={24} className="transition-transform duration-300" />
          </AccordionTrigger>
          <AccordionContent>
            {filteredData?.map(({ name, key: Pix }, index) => {
              const firstLetter = name.charAt(0).toUpperCase()
              const isFirstOfLetter =
                index === 0 ||
                name.charAt(0).toUpperCase() !==
                  filteredData[index - 1].name.charAt(0).toUpperCase()

              return (
                <React.Fragment key={index}>
                  {isFirstOfLetter && (
                    <h4 className="text-lg font-bold">{firstLetter}</h4>
                  )}
                  <Contact
                    name={name}
                    openModal={setOpenModalDeleteContact}
                    keyPix={Pix}
                  />
                </React.Fragment>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ModalDefault
        title="Confirmação de exclusão"
        body={<p>Tem certeza que deseja excluir a chave Pix?</p>}
        ArrayButton={
          <>
            <Button onClick={() => {}} className="bg-[#008000] text-base">
              Sim
            </Button>
            <Button
              onClick={() => setOpenModalDeleteContact(false)}
              className="bg-[#FF0000] text-base"
            >
              Não
            </Button>
          </>
        }
        openModal={openModalDeleteContact}
        setOpenModal={setOpenModalDeleteContact}
      />
    </>
  )
}

export default TransferList
