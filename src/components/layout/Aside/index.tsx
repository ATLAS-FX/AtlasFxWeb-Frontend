import { IconEyeReveal } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAtlas } from '@/contexts/AtlasContext'
import UserApi from '@/services/UserApi'
import { UserType } from '@/types/userType'
import { formatedHideValue, formatedPrice } from '@/utils/FormattedPrice'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { BlockPad } from './BlockPad'
import { Movements } from './Movements'

export const Aside: React.FC = () => {
  const { user, setUser } = useAtlas()
  const [hideValue, setHideValue] = useState<boolean>(false)

  const {
    data: infoUser,
    isLoading,
    isError
  } = useQuery<UserType>({
    queryKey: 'get-info-user',
    queryFn: async () => {
      const res = await UserApi.getInfo()
      return res
    }
  })

  useEffect(() => {
    if (infoUser) {
      setUser(infoUser)
    }
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados da conta.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [infoUser, isError])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[70vh] w-full rounded-lg" />
      ) : (
        <div className="flex h-[calc(100vh-10%)] flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-[#DDE2F0] px-4 pt-4">
          <ul>
            <BlockPad
              className="rounded-2xl bg-colorPrimary-500"
              children={
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col justify-center gap-2 text-white">
                    <h2 className="text-sm font-medium">Saldo em conta: </h2>
                    <h3 className="text-lg font-medium  ">
                      R${' '}
                      {!hideValue
                        ? formatedPrice(user.amount) || '0,00'
                        : formatedHideValue(user.amount || '0,00')}
                    </h3>
                    <h3>
                      Agência {user.agency} Conta: {user.account}
                    </h3>
                  </div>
                  <button onClick={() => setHideValue(!hideValue)}>
                    <IconEyeReveal
                      size={24}
                      className="mr-2 fill-white transition-all duration-200 ease-in-out hover:scale-125 hover:fill-white/70"
                    />
                  </button>
                </div>
              }
            />
            <BlockPad
              className=""
              children={
                <>
                  {user.releases.length >= 1 ? (
                    <ul>
                      <h2 className="py-2 text-start font-semibold text-colorPrimary-500">
                        Últimos Lançamentos:
                      </h2>
                      <li>
                        {user.releases
                          .sort(
                            (a, b) => Date.parse(b.created) - Date.parse(a.created)
                          )
                          .slice(0, 10)
                          .map(
                            (
                              { name, amount, method, send, id, created },
                              number
                            ) => (
                              <Movements
                                key={`${id + number}`}
                                id={id}
                                name={name}
                                amount={amount}
                                method={method}
                                send={send}
                                created={created}
                              />
                            )
                          )}
                      </li>
                    </ul>
                  ) : (
                    <h2 className="py-1 text-end font-semibold text-colorSecondary-500">
                      Não há lançamentos
                    </h2>
                  )}
                </>
              }
            />
          </ul>
        </div>
      )}
    </>
  )
}
