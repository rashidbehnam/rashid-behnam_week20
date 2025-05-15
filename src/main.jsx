import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      refetchOnMount:false,
      retry:1,
      staleTime:60 * 1000
    }
  }
})
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter >
   
        <QueryClientProvider  client={client}>

          <App />
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
  
    </BrowserRouter>
  </StrictMode>,
)
