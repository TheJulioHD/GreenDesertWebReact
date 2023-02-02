import React from 'react'
import { Routes, Route } from 'react-router'
const HomePage= React.lazy(()=> import('./pages/Home/HomePage')) 
const RouterLayout = React.lazy(()=>import('./Common/RouterLayout')) 

const Router:React.FC<{}> =() =>{
  return (
        <Routes>
            <Route path='/' element={<RouterLayout/>}>
                <Route path='/' element={<HomePage/>}/>

            </Route>
        </Routes>
  )
}

export default Router