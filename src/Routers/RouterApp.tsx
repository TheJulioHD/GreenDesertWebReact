import React from 'react'
import { Routes, Route } from 'react-router'
import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'
import { EmployeeRoutes } from './EmployeeRoutes'
import { InvetoryRoutes } from './InvetoryRoutes'
import { ProveedoresRoutes } from './ProveedoresRputes'
import AuthRouter from '../services/auth/AuthRouter'
import { Home } from '@mui/icons-material'
import { HomeRouter } from './HomeRouter'
import { ProductRoutes } from './ProductsRputes'
import { CustomerRoute } from './CustomerRouter'
import { JobOrderRoutes } from './JobOrderRputes'
import AuthRouter2 from '../services/auth/AuthRouter2'

export const RouterApp = () => {
  
  return (
    <Routes>
      <Route path='/*' element={ <AppRoutes/>}/>
      <Route path='/auth/*' element={<AuthRouter2><AuthRoutes/></AuthRouter2>}/>
      <Route path='/employee/*' element={<AuthRouter><EmployeeRoutes/></AuthRouter>} />
      <Route path='/invetory/*' element={<AuthRouter><InvetoryRoutes/></AuthRouter>} />
      <Route path='/Proveedores/*' element={<AuthRouter><ProveedoresRoutes/></AuthRouter>} />
      <Route path='/Productos/*' element={<AuthRouter><ProductRoutes/></AuthRouter>} />
      <Route path='/Customer/*' element={<AuthRouter><CustomerRoute/></AuthRouter>} />
      <Route path='/Joborder/*' element={<AuthRouter><JobOrderRoutes/></AuthRouter>} />
      <Route path='/home/*' element={<AuthRouter><HomeRouter/></AuthRouter>} />
    </Routes>
  )
  
}



  
