import { Login } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SideBar } from '../Common'
import { Navbar } from '../Common/navbar'
import { SignUp } from '../pages/Auth/SignOut/SignUp'

export const AuthRoutes = () => {
  return (

    <>
    
    <Navbar drawerWidth={240}/>
    <SideBar drawerWidth={240}/>

    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/signUp' element={<SignUp />}/>
      
      <Route path='/*' element={<Navigate to='login'/>}/>

    </Routes>
    
    </>

  )
}
