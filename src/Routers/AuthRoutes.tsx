import { Login } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../Common/Navbar'
import { SignUp } from '../pages/Auth/SignOut/SignUp'

export const AuthRoutes = () => {
  return (

    <>
    
    <Navbar drawerWidth={0}/>
    <div>asd</div>
    <div>asd</div>
    <div></div>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/signUp' element={<SignUp />}/>
      
      <Route path='/*' element={<Navigate to='login'/>}/>

    </Routes>
    </>

  )
}
