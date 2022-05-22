import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Home from '../pages/Home/Home'
import Register from './../pages/Auth/Register'
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default App
