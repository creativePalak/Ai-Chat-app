import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/store/User'
import { useEffect } from 'react'

function AuthMiddleware({ children }) {
    const navigate = useNavigate()
    const { isLogin } = useUser()

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    }, [isLogin, navigate])

    if (!isLogin) {
        return null // or a loader, or just nothing
    }

    return <>{children}</>
}

export default AuthMiddleware
