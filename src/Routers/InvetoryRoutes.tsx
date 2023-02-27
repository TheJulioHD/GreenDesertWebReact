import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { Navbar, SideBar } from '../Common'
import { AddEmployePage } from '../pages/employee/addEmployePage'
import Addinvetorypage from '../pages/Inventory/addinvetorypage'
import Inventoriypage from '../pages/Inventory/Inventoriypage'

export const InvetoryRoutes = () => {
  return (
    

    <Box sx={{display: 'flex'}}>
      
    <Navbar drawerWidth={240}/>
    <SideBar drawerWidth={240}/>

    <Box component='main' sx={{flexGrow: 1, p: 3}}>
      <Toolbar/>
      
      <Routes>
      <Route path='/add' element={<Addinvetorypage/>}/>
      <Route path='/' element={<Inventoriypage/>}/>
    </Routes>
  

    </Box>
    
  </Box>


  )
}
