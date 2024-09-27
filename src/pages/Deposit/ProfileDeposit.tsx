import {
  IconCopyDatabase,
  IconPDFDownload,
  IconQRCode,
  IconTicket
} from '@/components/icons'
import { ButtonAtlas, ModalConfirm, ModalDefault } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useCreateBarCode, useCreateQrCode } from '@/services/DepositApi'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { formattedPrice } from '@/utils/GenerateFormatted'
import QRCode from 'qrcode.react'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'

interface ProfileDepositProps {
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
  name: string
  cnpj: string
  bank: string
  agency: string
  account: string
}

const ProfileDeposit: React.FC<ProfileDepositProps> = ({
  state,
  setState,
  name,
  cnpj,
  bank,
  agency,
  account
}) => {
  const {
    mutate: createBarCode,
    // isLoading: loadBarCode,
    isError: errorBarCode
  } = useCreateBarCode()
  const {
    mutate: createQrCode,
    // isLoading: loadQrCode,
    isError: errorQrCode
  } = useCreateQrCode()

  const listBankDepositActions = [
    {
      title: 'Gerar QR Code para depósito',
      icon: IconQRCode,
      func: () => {
        setState((prev) => ({
          ...prev,
          selectPayment: 1,
          typePayment: 'qrcode',
          modal: true
        }))
      }
    },
    {
      title: 'Gerar boleto de recarga',
      icon: IconTicket,
      func: () => {
        setState((prev) => ({
          ...prev,
          selectPayment: 1,
          typePayment: 'bar',
          modal: true
        }))
      }
    }
  ]

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
            title: 'Seu boleto foi gerado com sucesso!',
            description: res.toString()
          })
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e.response?.data?.error,
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
            qrcode: res.toString(),
            key: res.toString(),
            selectPayment: 2
          }))
          toast({
            variant: 'success',
            title: 'Seu QrCode foi gerado com sucesso!',
            description: res.toString()
          })
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: e.response?.data?.error,
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

  useEffect(() => {
    console.log('state', state)
  }, [state])

  return (
    <>
      <div className="relative flex flex-col gap-2 rounded-xl border-[1px] border-[#7F828C33] p-6 text-xs">
        <Button
          className="absolute right-2 top-2 flex w-fit items-center gap-2 border-none bg-transparent fill-primary-default p-2 text-xs text-primary-default shadow-none transition-all duration-300 ease-in-out hover:fill-white hover:text-white"
          onClick={() =>
            handleCopyClick(
              `agência: ${agency || ''} conta: ${account || ''}`,
              'Sucesso ao copiar dados para deposito',
              'Falha ao copiar dados para deposito'
            )
          }
        >
          Copiar dados da conta
          <IconCopyDatabase className="size-3" />
        </Button>
        <h4 className="text-base font-semibold text-primary-default">
          {name || 'Nome da empresa'}
        </h4>
        <div className="ml-8 text-sm font-medium text-system-cinza">
          <h4>
            CNPJ: <span className="font-normal">{cnpj || ''}</span>
          </h4>
          <h4>
            Banco: <span className="font-normal">{bank || ''}</span>
          </h4>
          <h4>
            Agência: <span className="font-normal">{agency || ''}</span>
          </h4>
          <h4>
            Conta: <span className="font-normal">{account || ''}</span>
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {listBankDepositActions.map(({ title, icon: Icon, func }, number) => (
          <ButtonAtlas
            classButton="p-2 hover:bg-primary-hover hover:text-white transition-all duration-300 ease-in-out"
            classDiv="text-xs"
            key={number}
            title={title}
            icon={Icon}
            click={func}
          />
        ))}
      </div>
      <ModalDefault
        classPlus="max-w-fit"
        openModal={state.modal}
        setOpenModal={() => setState((prev) => ({ ...prev, modal: false }))}
        body={
          <>
            {state.selectPayment === 1 && (
              <ModalConfirm
                key={'deposit-step-1'}
                title={
                  state.typePayment === 'barcoede'
                    ? 'Gerar Código de Barras'
                    : 'Gerar QR Code'
                }
                back={() => setState((prev) => ({ ...prev, modal: false }))}
                contain={
                  <section className="flex flex-col gap-2">
                    <h4 className="text-base text-system-cinza">
                      Qual valor deseja depositar?
                    </h4>
                    <Input
                      placeholder="R$ 0,00"
                      value={state.amount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const format = formattedPrice(e.target.value) || ''
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
                  back={() => setState((prev) => ({ ...prev, selectPayment: 1 }))}
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
                              Após o pagamento, o saldo é liberado em até 3 dias
                              úteis.
                            </li>
                          </ul>
                          <div className="flex justify-center gap-2 py-2">
                            <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover hover:text-system-neutro">
                              <IconCopyDatabase className="size-5" />
                              Copiar código de barras
                            </Button>
                            <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover hover:text-system-neutro">
                              <IconPDFDownload className="size-5" />
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
                          <div className="flex gap-2 py-2">
                            <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover hover:text-system-neutro">
                              <IconCopyDatabase className="size-5" />
                              Copiar QR Code
                            </Button>
                            <Button className="min-w-32 items-center gap-2 rounded-md bg-primary-default fill-white p-2 text-base transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover hover:text-system-neutro">
                              <IconPDFDownload className="size-5" />
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
        }
        ArrayButton={<></>}
      />
    </>
  )
}

export default ProfileDeposit
