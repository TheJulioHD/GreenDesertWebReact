import React from 'react'
import { Routes, Route } from 'react-router'
import { SignUp } from '../pages/Auth/SignOut/SignUp'
import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'
import { EmployeeRoutes } from './EmployeeRoutes'
import { InvetoryRoutes } from './InvetoryRoutes'
import { ProveedoresRoutes } from './ProveedoresRputes'
import AuthRouter from '../Common/components/AuthRouter'

export const RouterApp = () => {
  
  return (
    <Routes>
      <Route path='/*' element={<AuthRouter> <AppRoutes/></AuthRouter>}/>
      <Route path='/auth/*' element={<AuthRoutes/>}/>
      <Route path='/employee/*' element={<AuthRouter><EmployeeRoutes/></AuthRouter>} />
      <Route path='/invetory/*' element={<AuthRouter><InvetoryRoutes/></AuthRouter>} />
      <Route path='/Proveedores/*' element={<AuthRouter><ProveedoresRoutes/></AuthRouter>} />
    </Routes>
  )
  
}



  
