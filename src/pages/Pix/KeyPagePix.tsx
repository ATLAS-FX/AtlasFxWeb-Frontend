import { IconCopyPaste, IconKey, IconTrash } from '@/components/icons'
import { Tooltip } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useCreatedKeyPix, useDeletePixKey, useListKeys } from '@/services/PixApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { useEffect, useState } from 'react'
import ModalKey from './ModalKey'

const keyMapList = {
  'key-random': 'Aleatória',
  email: 'E-mail',
  phone: 'Telefone',
  cpf: 'CPF'
}

interface KeyPagePixProps {}

const KeyPagePix: React.FC<KeyPagePixProps> = () => {
  const { data: myKeys, isLoading, isError, refetch } = useListKeys()
  const { mutate: deleteKey, isLoading: loadDeleteKey } = useDeletePixKey()
  const { mutate: createKey, isLoading: loadCreateKey } = useCreatedKeyPix()
  const [stateKey, setStateKey] = useState<{
    step: number
    stateModalKey: boolean
    typeKeyPix: string
    codeKeyPix: string
    idKeyPix: string
  }>({
    step: 0,
    stateModalKey: false,
    typeKeyPix: '',
    codeKeyPix: '',
    idKeyPix: ''
  })

  const handleDeleteKey = async () => {
    deleteKey(
      {
        id: stateKey.idKeyPix
      },
      {
        onSuccess: (res) => {
          setStateKey({
            ...stateKey,
            step: 2,
            idKeyPix: '',
            typeKeyPix: '',
            codeKeyPix: ''
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

  const handleCreateKey = async () => {
    createKey(
      {
        key_type: stateKey.typeKeyPix,
        key_code: stateKey.codeKeyPix
      },
      {
        onSuccess: (res) => {
          setStateKey({
            ...stateKey,
            step: 2,
            idKeyPix: '',
            typeKeyPix: '',
            codeKeyPix: ''
          })
          refetch()
          toast({
            variant: 'success',
            title: 'Seu nova chave pix foi criada sucesso!',
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
        title: 'Falha ao carregar minhas chaves pix.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [isError])

  return (
    <article>
      {isLoading && <Skeleton className="h-12 w-full rounded-lg" />}
      <div className="flex flex-col gap-2 rounded-md border-2 border-system-cinza/25 px-4 py-6 text-sm text-system-cinza">
        <div className="flex items-center justify-between pb-4">
          <h4 className="flex w-8/12 items-center gap-2 text-sm font-normal text-system-cinza">
            <IconKey className="size-5 fill-system-cinza" />
            Minhas Chaves
          </h4>
          <div
            className="cursor-pointer font-medium text-primary-default underline transition-all duration-300 ease-in-out hover:text-primary-hover/50"
            onClick={() =>
              setStateKey({
                ...stateKey,
                stateModalKey: true,
                typeKeyPix: 'create'
              })
            }
          >
            + Adicionar chave
          </div>
        </div>

        {myKeys?.length ? (
          myKeys.map(({ id, code, type }, number) => (
            <div
              key={`pixkey-${number}+${id}`}
              className="flex justify-between text-primary-default"
            >
              <span>
                {keyMapList[type as keyof typeof keyMapList]}: {code}
              </span>
              <div className="flex items-center gap-4 fill-primary-default">
                <Tooltip
                  children={
                    <div
                      onClick={() =>
                        handleCopyClick(
                          code,
                          'Chave pix copiada com sucesso!',
                          'Erro ao copiar chave pix'
                        )
                      }
                    >
                      <IconCopyPaste className="size-4 hover:fill-primary-hover" />
                    </div>
                  }
                  content="Copiar chave pix"
                />
                <Tooltip
                  children={
                    <div
                      onClick={() =>
                        setStateKey({
                          ...stateKey,
                          stateModalKey: true,
                          typeKeyPix: 'delete',
                          idKeyPix: id
                        })
                      }
                    >
                      <IconTrash className="size-4 hover:fill-primary-hover" />
                    </div>
                  }
                  content="Deletar chave pix"
                />
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-sm font-normal text-system-cinza">
            Nenhuma chave cadastrada
          </h4>
        )}
      </div>
      {/* <Accordion
        type="single"
        collapsible
        className="w-full rounded-md border-2 border-system-cinza/25 p-2 px-6"
      >
        <AccordionItem value="keypix-1">
          <AccordionTrigger className="flex items-center first:[&[data-state=open]>svg]:rotate-0"></AccordionTrigger>
        </AccordionItem>
      </Accordion> */}
      <ModalKey
        key={'modalpixkey'}
        state={stateKey}
        setState={setStateKey}
        funcCreate={handleCreateKey}
        funcDelete={handleDeleteKey}
        loadCreate={loadCreateKey}
        loadDelete={loadDeleteKey}
      />
    </article>
  )
}

export default KeyPagePix
