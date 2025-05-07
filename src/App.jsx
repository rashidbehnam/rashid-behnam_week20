import React from 'react'
import {toast,ToastContainer} from 'react-toastify'
import {Routes,Route} from 'react-router-dom'
import {ConfirmProvider} from './Context/ConfirmContext'
import {ModalProvider} from './Context/ModalContext'
import Modal from './components/Modal'
import ProductsList from './pages/ProductsList';
import Login from './pages/login';
import Registration from './pages/Registration';
import NotFound from './components/NotFound';

function App() {

  toast.success("success");

  return (
    <>
     <h1 className="text-blue-600">بوت کمپ بوتواستارت</h1>
        <ModalProvider>
          <ConfirmProvider>
            <Routes>
                <Route  path='/' index Component={ProductsList}/>
                <Route  path='/login' Component={Login}/>
                <Route  path='/registration' Component={Registration}/>
                <Route  path='*' Component={NotFound}/>
            </Routes>
            <Modal/>
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                pauseOnHover
                theme="light"/>
          </ConfirmProvider>
        </ModalProvider>
    </>
  )
}

export default App
