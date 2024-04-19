import Login from '@/pages/Auth/Login'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'
import Atlas_Logo from '../assets/atlas_logo.png'

export const AuthRoutes: React.FC = () => {
  const StyleAuth = {
    background: 'linear-gradient(358deg, #242F5F 0%, #425EA8 100%)',
    backgroundPosition: 'top',
    backgroundRepeat: 'repeat'
  }

  return (
    <div className="relative flex w-screen items-center justify-center overflow-x-hidden p-14">
      <div
        className="absolute inset-0 left-0 right-0 top-0 z-[-10] h-72 w-screen"
        style={StyleAuth}
      ></div>
      <div className="flex max-w-[1330px] flex-col items-center  gap-6">
        <img
          className="h-[72px] object-contain xl:h-16"
          src={Atlas_Logo}
          alt="logo_atlas"
        />
        <ReactRoutes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="*" element={<Navigate to="/login" />} />
        </ReactRoutes>
      </div>
    </div>
  )
}
