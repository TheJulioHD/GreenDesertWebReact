import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Children } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import {HomePage} from '../pages/Home/HomePage'

import {Navbar, SideBar}  from '../Common/layout';

export const HomeRouter = () => {
  return (

    <Box sx={{display: 'flex'}}>
      
      <Navbar drawerWidth={240}/>
      <SideBar drawerWidth={240}/>

      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <Toolbar/>

        <Routes>
        <Route path='/home' element={<HomePage/>}/>

        <Route path='/*' element={<Navigate to='home'/>}/>
      </Routes>

      </Box>
      
    </Box>

  )
}
