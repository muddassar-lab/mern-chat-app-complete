import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const login = async (email, password) => {
        try {
            if (!email || !password) {
                throw new Error('All fields are required')
            }
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                '/api/user/login',
                {
                    email,
                    password,
                },
                config
            )

            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            return { data }
        } catch (error) {
            setLoading(false)
            return { error }
        }
    }
    const register = async (name, email, password) => {
        try {
            if (!name || !email || !password) {
                throw new Error('All fields are required')
            }
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                '/api/user/register',
                {
                    name,
                    email,
                    password,
                },
                config
            )
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            return { data }
        } catch (error) {
            setLoading(false)
            return { error }
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user, login, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthState = () => useContext(AuthContext)

export default AuthProvider
