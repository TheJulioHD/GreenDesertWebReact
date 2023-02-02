import React from 'react'
import { Outlet } from 'react-router-dom'
const Navbar = React.lazy(()=> import('./Navbar'))

const RouterLayout:React.FC<{}> = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default RouterLayout