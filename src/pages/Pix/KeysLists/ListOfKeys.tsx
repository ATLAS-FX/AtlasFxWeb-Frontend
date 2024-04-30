import { IconCopyPaste } from '@/components/icons/CopyPaste'
import { IconShared } from '@/components/icons/Shared'
import { IconTrash } from '@/components/icons/Trash'
import { ModalDefault } from '@/components/layout/Modal/ModalDefault'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { listPixButton } from '@/utils/PixListButtons'
import { useEffect, useState } from 'react'

interface IListOfKeys {
  listMyKeys: App.KeyPixProps[]
  refetch: () => {}
}

const ListOfKeys: React.FC<IListOfKeys> = ({ refetch, listMyKeys }) => {
  const [openModalDeleteKey, setOpenModalDeleteKey] = useState<boolean>(false)
  const [data, setData] = useState<
    {
      icon: React.FC<App.IconProps> | string
      title: string | string
      id: string
      type: string
      code: string
      created: string
    }[]
  >([])

  useEffect(() => {
    if (listMyKeys.length > 0) {
      const filteredListPixActions = listMyKeys
        .filter((action) => listPixButton.some((item) => item.type === action.type))
        .map((action) => ({
          ...action,
          icon: listPixButton.find((item) => item.type === action.type)?.icon || '',
          title: listPixButton.find((item) => item.type === action.type)?.name || ''
        }))
      setData(filteredListPixActions)
    }
  }, [listMyKeys])

  console.log(data)

  const handleCopyClick = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({
          variant: 'success',
          title: 'Chave copiada com sucesso',
          description: ''
        })
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Falha ao copiar chave',
          description: e.message
        })
      })
  }

  const handleDeleteKeyPix = async (key: string) => {
    await PixApi.deletePixKey({ id: key })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu chave pix foi deletada com sucesso!',
          description: res.success
        })
        refetch()
        setOpenModalDeleteKey(false)
      })
      .catch((e: Error) => {
        toast({
          variant: 'destructive',
          title: 'Erro ao deletar chave pix',
          description: e.message
        })
      })
  }

  return (
    <div>
      {data.length > 0 ? (
        <>
          <h4 className="mb-4 text-base font-semibold">Gerencie suas chaves Pix</h4>
          <div className="flex flex-col gap-2">
            {data.map(({ id, title, code, icon: Icon }, number) => (
              <div
                key={number}
                className="flex items-center justify-between gap-2 rounded-xl border-2 border-colorPrimary-500 fill-colorPrimary-500 p-2 text-base font-bold text-colorPrimary-500"
              >
                <div className="flex items-center gap-2">
                  <Icon size={32} />
                  {title}
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger onClick={() => handleCopyClick(code)}>
                        <IconCopyPaste
                          size={20}
                          className="fill-colorPrimary-500 transition-transform duration-300 hover:fill-colorSecondary-500"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
                        Clique para copiar chave pix
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IconShared
                          size={20}
                          className="fill-colorPrimary-500 transition-transform duration-300 hover:fill-colorSecondary-500"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white"
                        onClick={() => handleCopyClick(code)}
                      >
                        Clique para compartilhar
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => setOpenModalDeleteKey(!openModalDeleteKey)}
                      >
                        <IconTrash
                          size={20}
                          className="fill-colorPrimary-500 transition-transform duration-300 hover:fill-colorSecondary-500"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md bg-colorPrimary-500 p-2 text-sm font-normal text-white">
                        Clique para deletar chave
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <ModalDefault
                  title="Confirmação de exclusão"
                  body={<p>Tem certeza que deseja excluir a chave Pix?</p>}
                  ArrayButton={
                    <>
                      <Button
                        onClick={() => handleDeleteKeyPix(id)}
                        className="bg-[#008000] text-base"
                      >
                        Sim
                      </Button>
                      <Button
                        onClick={() => setOpenModalDeleteKey(false)}
                        className="bg-[#FF0000] text-base"
                      >
                        Não
                      </Button>
                    </>
                  }
                  openModal={openModalDeleteKey}
                  setOpenModal={setOpenModalDeleteKey}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h4 className="pt-4 text-base font-bold">Nenhuma Chave Pix cadastrada.</h4>
        </>
      )}
    </div>
  )
}

export default ListOfKeys
