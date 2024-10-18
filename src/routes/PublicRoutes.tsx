import { useAtlas } from '@/contexts/AtlasContext'
import Login from '@/pages/Auth/'
import React from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'
import Atlas_Logo from '../assets/logos/AtlasFX_Logo2.svg'
import CarteiraX_Logo from '../assets/logos/Carteira_X _Logo2.svg'

export const PublicRoutes: React.FC = () => {
  const { themeSystem } = useAtlas()
  const StyleAuth = {
    background: themeSystem.text_primary,
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
          className="h-12 object-contain xl:h-16"
          src={themeSystem.systemName === 'Atlas FX' ? Atlas_Logo : CarteiraX_Logo}
          alt={`logo ${themeSystem.systemName}`}
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
