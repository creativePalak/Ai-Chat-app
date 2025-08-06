import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/store/User'
import { useEffect } from 'react'

function AuthMiddleware({ children }) {

    const navigate = useNavigate()
    const { isLogin, darkMode } = useUser()

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    }, [isLogin, navigate])

    if (!isLogin) {
        return null // or a loader, or just nothing
    }

    return <div className={`${darkMode ? 'dark' : ''}`}>
        {children}
    </div>
}

export default AuthMiddleware
