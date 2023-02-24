import { Routes, Route, Navigate } from 'react-router-dom'
import {HomePage} from '../pages/Home/HomePage'

import {Navbar, SideBar}  from './../Common';

export const AppRoutes = () => {
  return (

    <>

      <Navbar drawerWidth={240}/>
      <SideBar drawerWidth={240}/>
      
      <Routes>
        <Route path='/home' element={<HomePage/>}/>

        <Route path='/*' element={<Navigate to='home'/>}/>
      </Routes>
    </>

  )
}
