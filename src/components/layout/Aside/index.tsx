import { IconEyeReveal, IconPoint } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtlas } from '@/contexts/AtlasContext'
import { getInfoUser } from '@/services/UserApi'
import { formattedHideValue, formattedPrice } from '@/utils/GenerateFormatted'
import React, { useEffect, useState } from 'react'
import { BlockPad } from './BlockPad'
import { Movements } from './Movements'

const Aside: React.FC = () => {
  const { user, setUser } = useAtlas()
  const [hideValue, setHideValue] = useState<boolean>(
    localStorage.getItem('hideValue') === 'hide' ? true : false
  )
  const { data: infoUser, isLoading } = getInfoUser()

  useEffect(() => {
    localStorage.setItem('hideValue', hideValue ? 'hide' : 'visible')
  }, [hideValue])

  useEffect(() => {
    if (infoUser) {
      setUser((prev) => ({ ...prev, ...infoUser }))
    }
  }, [infoUser])

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-[70vh] w-full rounded-lg" />
      ) : (
        <div className="flex h-[calc(100dvh-80px)] flex-col rounded-2xl bg-[#DDE2F0] pt-4">
          <ul>
            <BlockPad
              className="mx-4 rounded-2xl bg-primary-default"
              children={
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col justify-center gap-2 text-system-neutro">
                    <h2 className="text-sm font-medium">Saldo em conta: </h2>
                    <h3 className="text-lg font-medium">
                      R${' '}
                      {!hideValue
                        ? formattedPrice(user?.amount.toString() || '0,00')
                        : formattedHideValue(user?.amount.toString() || '0,00')}
                    </h3>
                    <h3 className="flex items-center gap-2">
                      Agência {user?.agency}
                      <IconPoint className="size-1" />
                      Conta: {user?.account}
                    </h3>
                  </div>
                  <button onClick={() => setHideValue(!hideValue)}>
                    <IconEyeReveal
                      size={24}
                      className="mr-2 fill-system-neutro transition-all duration-200 ease-in-out hover:scale-125 hover:fill-white/70"
                    />
                  </button>
                </div>
              }
            />
            <BlockPad
              className="p-0"
              children={
                <>
                  {user?.releases.length >= 1 ? (
                    <ul>
                      <h2 className="py-2 pl-6 text-start font-semibold text-primary-default">
                        Últimos Lançamentos:
                      </h2>
                      <li className="h-[calc(100dvh-280px)] overflow-y-auto overflow-x-hidden px-6">
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
                    <h2 className="py-1 text-center font-semibold text-system-cinza">
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

export default Aside
