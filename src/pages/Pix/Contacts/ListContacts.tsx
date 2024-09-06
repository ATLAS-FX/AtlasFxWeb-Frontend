import { Contact, ModalDefault } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ContactsPixType } from '@/types/PixType'
import { ChevronDown, Search } from 'lucide-react'
import React, { useState } from 'react'

interface IContact {
  data: ContactsPixType[]
}

const ListContact: React.FC<IContact> = ({ data }) => {
  const [openModalDeleteContact, setOpenModalDeleteContact] =
    useState<boolean>(false)
  const [filtro, setFiltro] = useState<string>('')

  const sortedData = data?.sort((a, b) => a.name.localeCompare(b.name))

  const filteredData = sortedData?.filter((contato) =>
    contato.name.toLowerCase().startsWith(filtro.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        <h4 className="font-medium">Buscar por nome</h4>
        <div className='text-primary-default" flex items-center gap-2 rounded-xl border-2 border-primary-default fill-primary-default px-2 py-1 text-sm font-medium'>
          <label className="">
            <Search />
          </label>
          <Input
            className="border-none p-0 shadow-none"
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Separator className="w-[52%] bg-secondary-default" />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <h4 className="flex items-center gap-1 font-medium">
          Meus Contatos
          <ChevronDown size={24} />
        </h4>
        <div>
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
        </div>
      </div>
    </>
  )
}

export default ListContact
