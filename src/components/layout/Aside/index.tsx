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
import UserApi from '@/services/UserApi'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { useQuery } from 'react-query'
import { BlockPad } from './BlockPad'
import { Movements } from './Movements'

export const Aside: React.FC = () => {
  const { data: infoUser } = useQuery({
    queryKey: 'get-info-user',
    queryFn: async () => {
      const res = await UserApi.getInfo()
      return res
    }
  })

  console.log(infoUser)

  return (
    <div className="flex h-[80vh] flex-col overflow-y-auto">
      <ul>
        <BlockPad
          className="items-center bg-[#FFFFFF40]"
          children={
            <div className="text-center text-white">
              <h2>Olá, [Nome do Cliente]</h2>
              <h3>Agência 0001 Conta: 000000000-1</h3>
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
                  R$ 150.000.000,00
                </h3>
              </div>
              <IconEyeReveal size={48} className="mr-2 fill-colorPrimary-500" />
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
                <Movements />
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
                                Você gerará múltiplos boletos de forma simplificada,
                                ao mesmo tempo que facilita o processo de conciliação
                                financeira, garantindo o controle e a rastreabilidade
                                das transações de maneira eficiente.
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
                                Você realizará múltiplas transferências financeiras
                                de forma conveniente e eficiente, abrangendo diversos
                                tipos de transações, como PIX, transferências entre
                                contas bancárias (P2P) e TED, tudo em um único
                                processo organizado.
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
                                colaboradores, simplificando a tarefa de realizar os
                                pagamentos de forma eficiente e precisa.
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
  )
}
