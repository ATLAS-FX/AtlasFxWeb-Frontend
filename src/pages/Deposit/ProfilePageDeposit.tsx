import { IconCopyDatabase, IconQRCode, IconTicket } from '@/components/icons'
import { ButtonAtlas } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { handleCopyClick } from '@/utils/Copy&Paste'
import { Dispatch, SetStateAction } from 'react'
import ModalDeposit from './ModalDeposit'

interface ProfilePageDepositProps {
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

const ProfilePageDeposit: React.FC<ProfilePageDepositProps> = ({
  state,
  setState,
  name,
  cnpj,
  bank,
  agency,
  account
}) => {
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

  return (
    <article className="flex flex-col gap-4">
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
      <ModalDeposit state={state} setState={setState} />
    </article>
  )
}

export default ProfilePageDeposit
