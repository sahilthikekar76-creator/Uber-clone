import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/ContextCaptain'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { setCaptain } = useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const captainData = {
      email,
      password,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      )
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.token)
      navigate('/captain-home')
    } catch (error) {
      console.error(error.response?.data || error.message)
      alert('Invalid email or password')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRu9QNvM8_gANe0dGGCtqSuGH-7UueXlYROMGquTf75auAZTtxQ"
          className="w-14 mb-10"
        />

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@gmail.com"
            className="bg-[#eeeeee] rounded mb-7 px-2 py-2 w-full"
          />

          <h3 className="text-lg font-medium mb-2">Password</h3>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            className="bg-[#eeeeee] rounded mb-7 px-2 py-2 w-full"
          />

          <button className="bg-[#111] text-white rounded px-2 py-2 w-full">
            Login
          </button>

          <p className="text-center mt-2">
            Join a fleet?{' '}
            <Link to="/captain-register" className="text-blue-600">
              Register as a captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/user-login"
          className="bg-[#ef8b5d] flex justify-center text-white rounded px-2 py-2 w-full hover:bg-[#e75f21]"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
