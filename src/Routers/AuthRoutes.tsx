import { Login } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SideBar } from '../Common/layout'
import { Navbar } from '../Common/layout/Navbar'

import { SignIn } from '../pages/Auth/SignIn/SignIn'

export const AuthRoutes = () => {
  return (

    <>
    
    <Routes>
      <Route path='/login' element={<SignIn />}/>
      
      <Route path='/*' element={<Navigate to='login'/>}/>

    </Routes>

    </>

  )
}
