import React from 'react'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
)
