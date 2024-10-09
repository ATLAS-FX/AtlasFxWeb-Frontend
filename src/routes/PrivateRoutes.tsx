import { Aside, Sidebar } from '@/components/layout'
import { cn } from '@/lib/utils'
import HomePageDashBoard from '@/pages/DashBoard/HomePageDashBoard'
import HomePageDeposit from '@/pages/Deposit/HomePageDeposit'
import HomePageExtract from '@/pages/Extract/HomePageExtract'
import HomePagePayment from '@/pages/Payment/HomePagePayment'
import HomePagePix from '@/pages/Pix/HomePagePix'
import HomePageProfile from '@/pages/Profile/HomePageProfile'
import HomePageTransfer from '@/pages/Transfer/HomePageTransfer'
import React from 'react'
import {
  Navigate,
  Routes as ReactRoutes,
  Route,
  useLocation
} from 'react-router-dom'

export const PrivateRoutes: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <div
      className={cn(
        'grid h-screen w-screen grid-cols-[15%,50%,30%] items-start overflow-hidden bg-[#EFEFEF] p-10',
        pathname !== '/profile'
          ? 'grid-cols-[15%,50%,30%] justify-between gap-4'
          : 'grid-cols-[15%,calc(80%+32px)] gap-8'
      )}
    >
      <Sidebar />
      <ReactRoutes>
        {/* welcome */}
        <Route path="*" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" Component={HomePageDashBoard} />
        {/* deposito */}
        <Route path="deposits" Component={HomePageDeposit} />
        {/* extrato */}
        <Route path="extract" Component={HomePageExtract} />
        {/* pagamentos */}
        <Route path="payments" Component={HomePagePayment} />
        {/* transferencia */}
        <Route path="transfer" Component={HomePageTransfer} />
        {/* profile */}
        <Route path="profile" Component={HomePageProfile} />
        {/* pix */}
        <Route path="pix" Component={HomePagePix} />
      </ReactRoutes>
      {pathname !== '/profile' && <Aside />}
    </div>
  )
}
