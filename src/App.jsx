import React from 'react'
import {ToastContainer} from 'react-toastify'
import {Routes,Route} from 'react-router-dom'

import Modal from './components/Modal'
import ProductsList from './pages/ProductsList';
import Login from './pages/login';
import Registr from './pages/Registr';
import NotFound from './components/NotFound';

function App() {


  return (
    <>
     <h1 className="text-blue-600">بوت کمپ بوتواستارت</h1>
        
            <Routes>
                <Route  path='/' index Component={ProductsList}/>
                <Route  path='/login' Component={Login}/>
                <Route  path='/register' Component={Registr}/>
                <Route  path='*' Component={NotFound}/>
            </Routes>
            <Modal/>
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                pauseOnHover
                theme="light"/>
        
    </>
  )
}

export default App
