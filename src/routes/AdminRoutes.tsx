import { cn } from '@/lib/utils'
import React from 'react'

export const AdminRoutes: React.FC = () => {
  // const { setIsCustomizeCheckout, isCustomizeCheckout } = useAdm()
  // const location = useLocation()

  // useEffect(() => {
  //   if (location.pathname === '/checkout/personalizar') {
  //     setIsCustomizeCheckout(true)
  //   } else {
  //     setIsCustomizeCheckout(false)
  //   }
  // }, [location.pathname])

  return (
    <div className={cn('grid-areas font-fontTheme relative overflow-x-hidden')}>
      {/* <>
        <Header />
        <Sidebar />
      </> */}
      <div
        className="font-fontTheme relative overflow-y-hidden"
        style={{ gridArea: 'content' }}
      >
        {/* <ReactRoutes> */}
        {/* <Route path="/inicio" Component={Home} />
          <Route path="*" element={<Navigate to="/metricas" />} />
          <Route path="/usuarios" Component={Users} />
          <Route path="/metricas" Component={Metrics} />
          <Route path="/empresas" Component={Company} /> */}
        {/* <Route path="vendas">
            <Route index Component={Order} />
            <Route path="detalhes/:id" Component={OrderDetail} />
          </Route> */}
        {/* </ReactRoutes> */}
      </div>
    </div>
  )
}
