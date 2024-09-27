import { Aside, Sidebar } from '@/components/layout'
import Deposit from '@/pages/Deposit'
import Extract from '@/pages/Extract'
import Home from '@/pages/Home'
import Payments from '@/pages/Payment'
import Pix from '@/pages/Pix'
import Profile from '@/pages/Profile'
import Transfer from '@/pages/Transfer'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const PrivateRoutes: React.FC = () => {
  return (
    <div className="grid h-screen w-screen grid-cols-[15%,50%,30%] items-start justify-between gap-4 overflow-hidden bg-[#EFEFEF] p-10">
      <Sidebar />
      <ReactRoutes>
        {/* welcome */}
        <Route path="*" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" Component={Home} />
        {/* deposito */}
        <Route path="deposits" Component={Deposit} />
        {/* extrato */}
        <Route path="extract" Component={Extract} />
        {/* pagamentos */}
        <Route path="payments" Component={Payments} />
        {/* transferencia */}
        <Route path="transfer" Component={Transfer} />
        {/* profile */}
        <Route path="profile" Component={Profile} />
        {/* pix */}
        <Route path="pix" Component={Pix} />
      </ReactRoutes>
      <Aside />
    </div>
  )
}
