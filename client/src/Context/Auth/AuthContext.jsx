import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        setUser(userInfo)
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const AuthState = () => useContext(AuthContext)

export default AuthProvider
