import { IconCopyDatabase, IconDownload } from '@/components/icons'
import { InputFx, ModalConfirm } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useCreateBarCode, useCreateQrCode } from '@/services/DepositApi'
import { ErrorResponse } from '@/types/ErrorResponse'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { formattedPrice } from '@/utils/GenerateFormatted'
import QRCode from 'qrcode.react'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface ModalDepositProps {
  state: {
    typePayment: string
    stepPage: number
    selectPayment: number
    amount: string
    barcode: string
    qrcode: string
    key: string
    modal: boolean
  }
  setState: Dispatch<
    SetStateAction<{
      typePayment: string
      stepPage: number
      selectPayment: number
      amount: string
      barcode: string
      qrcode: string
      key: string
      modal: boolean
    }>
  >
}

const ModalDeposit: React.FC<ModalDepositProps> = ({ state, setState }) => {
  const {
    mutate: createBarCode,
    isLoading: loadBarCode,
    isError: errorBarCode
  } = useCreateBarCode()
  const {
    mutate: createQrCode,
    isLoading: loadQrCode,
    isError: errorQrCode
  } = useCreateQrCode()

  const handleCreateBarCode = async () => {
    createBarCode(
      { amount: state.amount },
      {
        onSuccess: (res: any) => {
          setState((prev) => ({
            ...prev,
            barcode: res.barcode.toString(),
            selectPayment: 2
          }))
          toast({
            variant: 'success',
            title: 'Seu boleto foi gerado com sucesso!'
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

  const handleCreateQrCode = async () => {
    createQrCode(
      { amount: state.amount },
      {
        onSuccess: (res: any) => {
          setState((prev) => ({
            ...prev,
            qrcode: res.qrcode.toString(),
            key: res.toString(),
            selectPayment: 2
          }))
          toast({
            variant: 'success',
            title: 'Seu QrCode foi gerado com sucesso!'
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
    if (errorBarCode || errorQrCode) {
      toast({
        variant: 'destructive',
        title: 'Falha ao carregar dados.',
        description: 'Por favor tente mais tarde!'
      })
    }
  }, [errorBarCode, errorQrCode])

  return (
    <Dialog
      open={state.modal}
      onOpenChange={() => setState({ ...state, modal: false })}
    >
      <DialogContent
        className={cn(
          'h-fit gap-4 rounded-xl bg-white py-4',
          state.selectPayment === 2 ? 'w-[464px]' : 'w-[464px]'
        )}
      >
        <>
          {state.selectPayment === 1 && (
            <ModalConfirm
              key={'deposit-step-1'}
              title={
                state.typePayment === 'barcoede'
                  ? 'Gerar Código de Barras'
                  : 'Gerar QR Code'
              }
              back={() =>
                setState((prev) => ({ ...prev, modal: false, amount: '' }))
              }
              contain={
                <section className="flex flex-col gap-2 pt-6">
                  <InputFx
                    name={'input-amount'}
                    label={'Qual valor deseja depositar'}
                    bgLabel="bg-white"
                    value={state.amount.length >= 1 ? `R$ ${state.amount}` : ''}
                    change={(e: string) => {
                      const format = formattedPrice(e) || ''
                      setState({ ...state, amount: format })
                    }}
                  />
                </section>
              }
              handleFunc={() => {
                state.typePayment === 'qrcode'
                  ? handleCreateQrCode()
                  : handleCreateBarCode()
              }}
              loading={state.typePayment === 'qrcode' ? loadQrCode : loadBarCode}
            />
          )}
          {state.selectPayment === 2 && (
            <>
              <ModalConfirm
                key={'deposit-step-2'}
                title={
                  state.typePayment === 'barcoede'
                    ? 'Gerar Código de Barras'
                    : 'Gerar QR Code'
                }
                back={() =>
                  setState((prev) => ({ ...prev, selectPayment: 1, amount: '' }))
                }
                contain={
                  <section className="flex max-w-[512px] flex-col gap-2">
                    {state.typePayment === 'bar' ? (
                      <>
                        <h4 className="rounded-md border-[1px] p-2 text-xl text-primary-default">
                          {state.barcode}
                        </h4>
                        <ul className="list-disc px-6 py-2 text-sm text-system-cinza">
                          <li>
                            Atenção! Este boleto pode levar até 30 minutos para ser
                            processado pela CIP e reconhecido pelos demais bancos.
                          </li>
                          <li>
                            Após o pagamento, o saldo é liberado em até 3 dias úteis.
                          </li>
                        </ul>
                        <div className="flex justify-between gap-2 py-2">
                          <Button
                            className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:bg-primary-hover hover:text-system-neutro"
                            onClick={() => {
                              handleCopyClick(
                                state.barcode,
                                'Sucesso ao copiar código de barras',
                                'Falha ao copiar código de barras'
                              )
                            }}
                          >
                            <IconCopyDatabase className="size-5" />
                            Copiar código de barras
                          </Button>
                          <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:bg-primary-hover hover:text-system-neutro">
                            <IconDownload className="size-5" />
                            Exportar como PDF
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <QRCode
                          value={state.qrcode}
                          className="m-auto my-0 object-contain py-2"
                          size={250}
                        />
                        <div className="flex justify-between gap-2 py-2">
                          <Button
                            className="min-w-32 items-center gap-2 rounded-md border-2 border-primary-default bg-white fill-primary-default p-2 text-base text-primary-default transition-all duration-300 ease-in-out hover:bg-primary-hover hover:fill-white hover:text-system-neutro"
                            onClick={() => {
                              handleCopyClick(
                                state.qrcode,
                                'Sucesso ao copiar código QRCode',
                                'Falha ao copiar código QRCode'
                              )
                            }}
                          >
                            <IconCopyDatabase className="size-5" />
                            Copiar QR Code
                          </Button>
                          <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:bg-primary-hover hover:text-system-neutro">
                            <IconDownload className="size-5" />
                            Exportar como PDF
                          </Button>
                        </div>
                      </>
                    )}
                  </section>
                }
              />
            </>
          )}
        </>
      </DialogContent>
    </Dialog>
  )
}

export default ModalDeposit
