import { IconBankLoan } from '@/components/icons/BankLoan'
import { IconCard } from '@/components/icons/Card'
import { IconDeposit } from '@/components/icons/Deposit'
import { IconExtract } from '@/components/icons/Extract'
import { IconInvestment } from '@/components/icons/Investment'
import { IconPayment } from '@/components/icons/Payment'
import { IconPix } from '@/components/icons/Pix'
import { IconTransfer } from '@/components/icons/Transfer'

export const checkoutItems = [
  {
    id: 1,
    title: 'Área PIX',
    icon: IconPix,
    path: '/pix',
    active: true,
    comming: false
  },
  {
    id: 2,
    title: 'Extrato',
    icon: IconExtract,
    path: '/extract',
    active: true,
    comming: false
  },
  {
    id: 3,
    title: 'Pagamentos',
    icon: IconPayment,
    path: '/payments',
    active: true,
    comming: false
  },
  {
    id: 4,
    title: 'Transferir',
    icon: IconTransfer,
    path: '/transfer',
    active: true,
    comming: false
  },
  {
    id: 5,
    title: 'Depósito',
    icon: IconDeposit,
    path: '/deposit',
    active: true,
    comming: false
  },
  {
    id: 6,
    title: 'Emprestimo',
    icon: IconBankLoan,
    path: '/',
    active: false,
    comming: true
  },
  {
    id: 5,
    title: 'Investimentos',
    icon: IconInvestment,
    path: '/',
    active: false,
    comming: true
  },
  {
    id: 5,
    title: 'Cartões',
    icon: IconCard,
    path: '/',
    active: false,
    comming: true
  }
]
