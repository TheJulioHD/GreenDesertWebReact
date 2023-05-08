import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { Navbar, SideBar } from '../Common/layout'
import { AddEmployePage } from '../pages/employee/addEmployePage'
import Addinvetorypage from '../pages/Inventory/addinvetorypage'

import Proveedorespage from '../pages/Proveedores/proveedorespage'
import { AddProveedorespage } from '../pages/Proveedores/addproveedorespage'
import Productpage from '../pages/Product/productpage'

export const ProductRoutes = () => {
  return (
    

    <Box sx={{display: 'flex'}}>
      
    <Navbar drawerWidth={240}/>
    <SideBar drawerWidth={240}/>

    <Box component='main' sx={{flexGrow: 1, p: 3}}>
      <Toolbar/>
      
      <Routes>
      <Route path='/' element={<Productpage/>}/>
    </Routes>
  

    </Box>
    
  </Box>


  )
}
