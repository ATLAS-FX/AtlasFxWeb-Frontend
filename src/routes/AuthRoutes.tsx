import Login from '@/pages/Auth/Login'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'
import Atlas_Logo from '../assets/atlas_logo.png'

export const AuthRoutes: React.FC = () => {
  const StyleAuth = {
    background: 'linear-gradient(358deg, #242F5F 0%, #425EA8 100%)',
    backgroundPosition: 'top'
  }

  return (
    <div className="flex w-screen relative flex-col items-center justify-start gap-6 overflow-x-hidden p-14">
      <div className="h-72 w-screen absolute top-0 right-0 left-0 z-[-10] inset-0" style={StyleAuth}></div>
      <img
        className="object-contain"
        src={Atlas_Logo}
        alt="logo_atlas"
        height={72}
      />
      <ReactRoutes>
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        {/* <Route path="/recovery" Component={RecoveryPassword} />
        <Route path="/confirm-email" Component={ConfirmEmail} />
        <Route path="/register" Component={Register} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </ReactRoutes>
    </div>
  )
}
