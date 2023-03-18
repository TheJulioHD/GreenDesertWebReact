import React from 'react'
import { Routes, Route } from 'react-router'
import { SignUp } from '../pages/Auth/SignOut/SignUp'
import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'
import { EmployeeRoutes } from './EmployeeRoutes'
import { InvetoryRoutes } from './InvetoryRoutes'
import { ProveedoresRoutes } from './ProveedoresRputes'

export const RouterApp = () => {
  
  return (
    <Routes>
      <Route path='/*' element={<AppRoutes/>}/>
      <Route path='/auth/*' element={<AuthRoutes/>}/>
      <Route path='/employee/*' element={<EmployeeRoutes/>} />
      <Route path='/invetory/*' element={<InvetoryRoutes/>} />
      <Route path='/Proveedores/*' element={<ProveedoresRoutes/>} />
    </Routes>
  )
  
}



  
