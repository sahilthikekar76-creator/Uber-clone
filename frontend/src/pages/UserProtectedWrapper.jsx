import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('userToken')

  useEffect(() => {
    if (!token) {
      navigate('/user-login')
    }
  }, [token, navigate])

  return <>{children}</>
}

export default UserProtectedWrapper
