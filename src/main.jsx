import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ModalProvider } from './Context/ModalContext.jsx'
import { ConfirmProvider } from './Context/ConfirmContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
    <ModalProvider>
      <ConfirmProvider>
          <App />
      </ConfirmProvider>
    </ModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
