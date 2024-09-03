import { Aside } from '@/components/layout/Aside'
import { Sidebar } from '@/components/layout/Sidebar'
import BankDeposit from '@/pages/BankDeposit'
import Extract from '@/pages/Extract'
import Home from '@/pages/Home'
import Payments from '@/pages/Payment'
import Pix from '@/pages/Pix'
import PixContacts from '@/pages/Pix/Contacts/PixContacts'
import PixKeys from '@/pages/Pix/KeysLists/PixKeys'
import PixStep from '@/pages/Pix/Transactions/PixStep'
import Profile from '@/pages/Profile'
import CloseAccount from '@/pages/Profile/CloseAccount'
import Password from '@/pages/Profile/Password'
import RegistrationStep from '@/pages/Profile/Registration/RegistrationStep'
import Transfer from '@/pages/Transfer'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const PrivateRoutes: React.FC = () => {
  return (
    <div className="grid h-screen w-screen grid-cols-[15%,50%,30%] items-start justify-between gap-6 overflow-x-hidden bg-[#EFEFEF] p-10">
      <Sidebar />
      <ReactRoutes>
        {/* welcome */}
        <Route path="/welcome" Component={Home} />
        {/* deposito */}
        <Route path="deposits" Component={BankDeposit} />
        {/* extrato */}
        <Route path="extract" Component={Extract} />
        {/* pagamentos */}
        <Route path="payments" Component={Payments} />
        {/* transferencia */}
        <Route path="transfer" Component={Transfer} />
        {/* pix */}
        <Route path="pix">
          <Route index Component={Pix} />
          <Route path=":id" Component={PixStep} />
          <Route path="my-keys" Component={PixKeys} />
          <Route path="my-contacts" Component={PixContacts} />
        </Route>
        {/* profile */}
        <Route path="profile">
          <Route index Component={Profile} />
          <Route path="registration" Component={RegistrationStep} />
          <Route path="password" Component={Password} />
          <Route path="close-account" Component={CloseAccount} />
        </Route>
        <Route path="*" element={<Navigate to="/welcome" />} />
      </ReactRoutes>
      <Aside />
    </div>
  )
}
