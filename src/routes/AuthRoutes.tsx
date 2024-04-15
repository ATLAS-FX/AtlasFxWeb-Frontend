import Login from '@/pages/Auth/Login'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start overflow-x-hidden p-16 gap-14">
      <img src="../src/assets/atlas_logo.png" alt="logo_atlas" width={200} />
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
