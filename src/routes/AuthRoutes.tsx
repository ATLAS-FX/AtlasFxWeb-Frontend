import Login from '@/pages/Auth/Login'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const AuthRoutes: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
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
