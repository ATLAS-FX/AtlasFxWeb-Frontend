import batchTransfer from '@/assets/batch_transfer.svg'
import payRoll from '@/assets/payroll.svg'
import ticketIssuance from '@/assets/ticket_issuance.svg'
import { IconEyeReveal } from '@/components/icons/EyeReval'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useAdm } from '@/contexts/UserContext'
import UserApi from '@/services/UserApi'
import { formatedHideValue, formatedPrice } from '@/utils/formatedPrice'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { BlockPad } from './BlockPad'
import { Movements } from './Movements'

export const Aside: React.FC = () => {
  const { user, setUser } = useAdm()
  const [hideValue, setHideValue] = useState<boolean>(false)

  const {
    data: infoUser,
    isLoading,
    isError
  } = useQuery<App.UserProps>({
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
        <div className="flex h-[calc(100vh-164px)] flex-col overflow-y-auto overflow-x-hidden">
          <ul>
            <BlockPad
              className="items-start bg-[#FFFFFF40]"
              children={
                <div className="text-white">
                  <h2>
                    Olá, <span className="text-colorSecondary-500">{user.name}</span>
                  </h2>
                  <h3>
                    Agência {user.agency} Conta: {user.account}
                  </h3>
                </div>
              }
            />
            <BlockPad
              className="bg-colorSecondary-500"
              children={
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col justify-center gap-2 text-colorPrimary-500">
                    <h2 className="text-sm font-semibold">Saldo em conta: </h2>
                    <h3
                      className="text-xl font-semibold"
                      style={{ textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 4px' }}
                    >
                      R${' '}
                      {!hideValue
                        ? formatedPrice(user.amount)
                        : formatedHideValue(user.amount)}
                    </h3>
                  </div>
                  <button onClick={() => setHideValue(!hideValue)}>
                    <IconEyeReveal
                      size={48}
                      className="mr-2 fill-colorPrimary-500"
                    />
                  </button>
                </div>
              }
            />
            <BlockPad
              className="bg-[#FFFFFF40]"
              children={
                <ul>
                  <h2 className="py-1 text-end font-semibold text-colorSecondary-500">
                    Últimos Lançamentos
                  </h2>
                  <li>
                    <Separator className="mb-4 bg-white/30" />
                    {user.releases.map(
                      ({ name, amount, method, send, id, created }) => (
                        <Movements
                          key={Number(id)}
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
              }
            />
            <BlockPad
              className="bg-[#FFFFFF40]"
              children={
                <>
                  <div className="gap flex flex-col">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="mb-2 flex items-center justify-start gap-2 text-white">
                            <h2 className="text-start text-xs">
                              Em breve, muito mais facilidades para sua empresa
                            </h2>
                            <ChevronDown size={24} />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <BlockPad
                            className="bg-white px-2"
                            children={
                              <div className="flex items-center justify-between gap-2">
                                <img
                                  src={ticketIssuance}
                                  alt="imagem de emissão de boleto em lote"
                                  className="object-contain"
                                  width={78}
                                />
                                <div className="flex flex-col items-center gap-1">
                                  <h2
                                    className="flex w-full flex-col text-xs font-semibold text-colorPrimary-500"
                                    style={{
                                      textShadow: 'rgba(0, 0, 0, 0.4) 0px 3px 3px'
                                    }}
                                  >
                                    Emissão de boleto em lote
                                  </h2>
                                  <span className="text-justify text-[10px] font-normal">
                                    Você gerará múltiplos boletos de forma
                                    simplificada, ao mesmo tempo que facilita o
                                    processo de conciliação financeira, garantindo o
                                    controle e a rastreabilidade das transações de
                                    maneira eficiente.
                                  </span>
                                </div>
                              </div>
                            }
                          />
                          <BlockPad
                            className="bg-white px-2"
                            children={
                              <div className="flex items-center justify-between gap-2">
                                <img
                                  src={batchTransfer}
                                  alt="imagem de transferência em lote"
                                  className="object-contain"
                                  width={78}
                                />
                                <div className="flex flex-col items-center gap-1">
                                  <h2
                                    className="flex w-full flex-col text-xs font-semibold text-colorPrimary-500"
                                    style={{
                                      textShadow: 'rgba(0, 0, 0, 0.4) 0px 3px 3px'
                                    }}
                                  >
                                    Transferência em lote
                                  </h2>
                                  <span className="text-justify text-[10px] font-normal">
                                    Você realizará múltiplas transferências
                                    financeiras de forma conveniente e eficiente,
                                    abrangendo diversos tipos de transações, como
                                    PIX, transferências entre contas bancárias (P2P)
                                    e TED, tudo em um único processo organizado.
                                  </span>
                                </div>
                              </div>
                            }
                          />
                          <BlockPad
                            className="bg-white px-2"
                            children={
                              <div className="flex items-center justify-between gap-2">
                                <img
                                  src={payRoll}
                                  alt="imagem de folha de pagamentos"
                                  className="object-contain"
                                  width={78}
                                />
                                <div className="flex flex-col items-center gap-1">
                                  <h2
                                    className="flex w-full flex-col text-xs font-semibold text-colorPrimary-500"
                                    style={{
                                      textShadow: 'rgba(0, 0, 0, 0.4) 0px 3px 3px'
                                    }}
                                  >
                                    Folha de pagamentos
                                  </h2>
                                  <span className="text-justify text-[10px] font-normal">
                                    Você efetuará os pagamentos dos salários dos
                                    colaboradores, simplificando a tarefa de realizar
                                    os pagamentos de forma eficiente e precisa.
                                  </span>
                                </div>
                              </div>
                            }
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </>
              }
            />
          </ul>
        </div>
      )}
    </>
  )
}
