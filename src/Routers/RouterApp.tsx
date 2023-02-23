import React from 'react'
import { Routes, Route } from 'react-router'
import { SignUp } from '../pages/Auth/SignOut/SignUp'
import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'

export const RouterApp = () => {
  
  return (
    <Routes>
      <Route path='/*' element={<AppRoutes/>}/>
      <Route path='/auth/*' element={<AuthRoutes/>}/>
    </Routes>
  )
  
}



  
