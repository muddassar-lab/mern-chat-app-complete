import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatProvider from '../Context/Chat/ChatContext'
import Login from '../pages/Auth/Login'
import Home from '../pages/Home/Home'
import Register from './../pages/Auth/Register'
const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ChatProvider>
                        <Home />
                    </ChatProvider>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default App
