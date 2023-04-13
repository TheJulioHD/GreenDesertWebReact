import { Login } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SideBar } from '../Common'
import { Navbar } from '../Common/navbar'
import { SignUp } from '../pages/Auth/SignOut/SignUp'
import { SignIn } from '../pages/Auth/SignIn/SignIn'

export const AuthRoutes = () => {
  return (

    <>
    
    <Routes>
      <Route path='/login' element={<SignIn />}/>
      <Route path='/signUp' element={<SignUp />}/>
      
      <Route path='/*' element={<Navigate to='login'/>}/>

    </Routes>

    </>

  )
}
