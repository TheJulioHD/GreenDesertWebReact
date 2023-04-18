import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { Navbar, SideBar } from '../Common/layout'
import { AddEmployePage } from '../pages/employee/addEmployePage'

export const EmployeeRoutes = () => {
  return (
    

    <Box sx={{display: 'flex'}}>
      
    <Navbar drawerWidth={240}/>
    <SideBar drawerWidth={240}/>

    <Box component='main' sx={{flexGrow: 1, p: 3}}>
      
      <Toolbar/>
      
      <Routes>
        <Route path='/add' element={<AddEmployePage/>}/>
      </Routes>
  
    </Box>
    
  </Box>


  )
}
