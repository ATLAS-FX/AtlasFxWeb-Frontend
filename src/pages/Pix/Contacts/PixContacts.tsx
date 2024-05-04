import { AdminContainer } from '@/components/layout/Container'
import { Title } from '@/components/layout/Text/Title'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import PixApi from '@/services/PixApi'
import { ChevronDown, Search } from 'lucide-react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Contact from './Contact'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Button } from '@/components/ui/button'

const PixContacts: React.FC = () => {
  const navigate = useNavigate()
  const [openModalDeleteContact, setOpenModalDeleteContact] =
    useState<boolean>(false)
  const [data, setData] = useState<App.ContactsPixProps[]>([])
  const [stepContactPix, setStepContactPix] = useState<number>(0)
  const [filtro, setFiltro] = useState<string>('')

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

  const sortedData = data?.sort((a, b) => a.name.localeCompare(b.name))

  const filteredData = sortedData?.filter((contato) =>
    contato.name.toLowerCase().startsWith(filtro.toLowerCase())
  )

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[calc(100vh-164px)] w-full rounded-lg" />
      ) : (
        <AdminContainer>
          <Title text="Meus Contatos Salvos" back={() => navigate(-1)} />
          {stepContactPix === 0 && (
            <>
              <div className="flex flex-col gap-2 text-sm">
                <h4 className="font-medium">Buscar por nome</h4>
                <div className='text-colorPrimary-500" flex items-center gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 px-2 py-1 text-sm font-medium'>
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
                <Separator className="w-[52%] bg-colorSecondary-500" />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <h4 className="flex items-center gap-1 font-medium">
                  Meus Contatos
                  <ChevronDown size={24} />
                </h4>
                <div>
                  {filteredData?.map(({ name }, index) => {
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
                          step={setStepContactPix}
                        />
                      </React.Fragment>
                    )
                  })}
                  <ModalDefault
                    title="Confirmação de exclusão"
                    body={<p>Tem certeza que deseja excluir a chave Pix?</p>}
                    ArrayButton={
                      <>
                        <Button
                          onClick={() => {}}
                          className="bg-[#008000] text-base"
                        >
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
          )}
          {stepContactPix >= 1 && <></>}
        </AdminContainer>
      )}
    </>
  )
}

export default PixContacts
