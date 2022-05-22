import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/Auth/AuthContext'
import './css/index.css'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
