import { createRoot } from 'react-dom/client'
// import './reset.css'
import styles from './Main.module.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { UserDataProvider } from './context/User.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <UserDataProvider>
           <App /> 
        </UserDataProvider>
        </BrowserRouter>
    </StrictMode>
)
