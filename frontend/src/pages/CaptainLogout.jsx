import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem('captainToken')

        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.log('Logout error:', error)
      } finally {
        localStorage.removeItem('captainToken')
        navigate('/captain-login')
      }
    }

    logout()
  }, [navigate])

  return (
    <div className="flex justify-center mt-10">
      Logging you out...
    </div>
  )
}

export default CaptainLogout
