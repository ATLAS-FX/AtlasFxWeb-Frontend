import Login from '@/pages/Auth/Login'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'
import Atlas_Logo from '../assets/atlas_logo.png'

export const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-14 overflow-x-hidden p-16">
      <img src={Atlas_Logo} alt="logo_atlas" width={200} />
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
