import { IconClose, IconCopyPaste, IconShared, IconTrash } from '@/components/icons'
import { ButtonAtlas, ButtonNext, ModalDefault } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import PixApi from '@/services/PixApi'
import { IconType } from '@/types/iconType'
import { KeyPixType } from '@/types/PixType'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { ErrorResponse } from '@/utils/ErrorResponse'
import { listPixButton } from '@/utils/PixListButtons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IListOfKeys {
  listMyKeys: KeyPixType[]
  refetch: () => {}
}

const ListOfKeys: React.FC<IListOfKeys> = ({ refetch, listMyKeys }) => {
  const navigate = useNavigate()
  const [openModalDeleteKey, setOpenModalDeleteKey] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<
    {
      icon: React.FC<IconType>
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
          icon:
            listPixButton.find((item) => item.type === action.type)?.icon ||
            IconClose,
          title: listPixButton.find((item) => item.type === action.type)?.name || ''
        }))
      setData(filteredListPixActions)
    }
  }, [listMyKeys])

  const handleDeleteKeyPix = async (key: string) => {
    setLoading(true)
    await PixApi.deletePixKey({ id: key })
      .then((res) => {
        toast({
          variant: 'success',
          title: 'Seu chave pix foi deletada com sucesso!',
          description: res.success
        })
        data.length >= 1 ? refetch() : navigate(0)
        setOpenModalDeleteKey(false)
      })
      .catch((e: ErrorResponse) => {
        toast({
          variant: 'destructive',
          title: e.response?.data?.error,
          description: 'Erro ao deletar chave pix'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      {data.length > 0 ? (
        <>
          <h4 className="mb-4 text-base font-semibold">Gerencie suas chaves Pix</h4>
          <div className="flex flex-col gap-2">
            {data.map(({ id, title, code, icon: Icon }, number) => (
              <React.Fragment key={number}>
                <ButtonAtlas
                  title={title}
                  icon={Icon}
                  listAction={[
                    {
                      icon: IconCopyPaste,
                      tooltip: 'Clique para copiar chave pix',
                      func: () => {
                        handleCopyClick(
                          code,
                          'Chave copiada com sucesso',
                          'Falha ao copiar chave'
                        )
                      }
                    },
                    {
                      icon: IconShared,
                      tooltip: 'Clique para compartilhar',
                      func: () => {
                        handleCopyClick(
                          code,
                          'Chave copiada com sucesso',
                          'Falha ao copiar chave'
                        )
                      }
                    },
                    {
                      icon: IconTrash,
                      tooltip: 'Clique para deletar chave',
                      func: () => {
                        setOpenModalDeleteKey(!openModalDeleteKey)
                      }
                    }
                  ]}
                />
                <ModalDefault
                  title="Confirmação de exclusão"
                  body={<p>Tem certeza que deseja excluir a chave Pix?</p>}
                  ArrayButton={
                    <>
                      <ButtonNext
                        title="Sim"
                        loading={loading}
                        func={() => handleDeleteKeyPix(id)}
                        classPlus="rounded-xl w-full bg-[#008000]"
                      />
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
              </React.Fragment>
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
