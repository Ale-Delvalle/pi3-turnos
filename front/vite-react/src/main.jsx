import { createRoot } from 'react-dom/client'
// import './reset.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { UserDataProvider } from './context/User.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <UserDataProvider>
            <ThemeProvider>
                <App /> 
            </ThemeProvider>
        </UserDataProvider>
        </BrowserRouter>
    </StrictMode>
)
