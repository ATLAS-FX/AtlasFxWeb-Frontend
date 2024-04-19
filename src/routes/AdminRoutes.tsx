import { Aside } from '@/components/layout/Aside/Aside'
import { Header } from '@/components/layout/Header/Header'
import { Sidebar } from '@/components/layout/Sidebar/Sidebar'
import Home from '@/pages/Home/Home'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const AdminRoutes: React.FC = () => {
  const StyleAuth = {
    background: 'linear-gradient(358deg, #242F5F 0%, #425EA8 100%)',
    backgroundPosition: 'top'
  }

  return (
    <div className="relative flex h-screen w-screen items-start justify-center overflow-x-hidden p-8 xl:p-4">
      <div
        className="absolute inset-0 left-0 right-0 top-0 z-[-10] w-screen"
        style={StyleAuth}
      ></div>
      <div className="flex max-w-[1440px] flex-col items-center justify-around gap-8">
        <Header />
        <div className="grid grid-cols-[96px_minmax(500px,_1fr)_368px] gap-8 justify-center items-start">
          <Sidebar />
          <div className="flex max-h-[76vh] overflow-y-auto px-8">
            <ReactRoutes>
              <Route path="/welcome" Component={Home} />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </ReactRoutes>
          </div>
          <Aside />
        </div>
      </div>
    </div>
  )
}
