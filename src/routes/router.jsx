
import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ProtectedRout from './ProtectedRout'

const Router=()=>{
    return (
        <Routes>
                <Route  path='/' index element={<Navigate to='/products'/>}/>s
                <Route path='/products' element={
                     <ProtectedRout>
                    <Products/>
                </ProtectedRout>  }/>
                <Route  path='/login' element={<Login/>}/>
                <Route  path='/register' element={<Register/>}/>
                <Route  path='*' Component={<NotFound/>}/>
        </Routes>
    )
  }

  export default Router