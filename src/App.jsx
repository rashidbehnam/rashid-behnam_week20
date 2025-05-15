import React from 'react'
import {ToastContainer} from 'react-toastify'
import Router from './routes/router'



function App() {


  return (
    <>
     <h1 className="text-blue-600">بوت کمپ بوتواستارت</h1>
        
          <Router />
            {/* <Modal/> */}
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                pauseOnHover
                theme="light"/>
        
    </>
  )
}

export default App
