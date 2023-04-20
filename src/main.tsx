import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MainApp/App'
import './scss/CompiledCss/main.css'
import {BrowserRouter} from 'react-router-dom'
import MainProviderContext, { MainProvider } from './contexts/MainContext'
import {useContext, useState} from 'react'
import ContextWrapperLinks from './contexts/LinkContructorContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
  <BrowserRouter>
    <MainProviderContext>
      <ContextWrapperLinks>
      
        <App />
       
      </ContextWrapperLinks>
    </MainProviderContext>
  </BrowserRouter>
  //</React.StrictMode>,
)
