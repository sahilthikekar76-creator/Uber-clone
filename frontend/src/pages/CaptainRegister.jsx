import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/ContextCaptain'

const CaptainRegister = () => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newCaptain = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      )

      const data = response.data

      setCaptain(data.captain)
  
      localStorage.setItem('captainToken', data.token)
      
      navigate('/captain-login')
    } catch (error) {
      console.error(error.response?.data || error.message)
    }


    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRu9QNvM8_gANe0dGGCtqSuGH-7UueXlYROMGquTf75auAZTtxQ"
          className="w-14 mb-10"
        />

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">Captain details</h3>

          <div className="flex gap-5 mb-5">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
              required
              className="bg-[#eeeeee] px-2 py-2 w-1/2 rounded"
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
              required
              className="bg-[#eeeeee] px-2 py-2 w-1/2 rounded"
            />
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-4"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-4"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle details</h3>

          <input
            placeholder="Vehicle color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-3"
          />

          <input
            placeholder="Vehicle plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-3"
          />

          <input
            placeholder="Capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-3"
          />

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="bg-[#eeeeee] px-2 py-2 w-full rounded mb-4"
          >
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="bike">Bike</option>
          </select>

          <button className="bg-black text-white w-full py-2 rounded">
            Create Captain Account
          </button>

          <p className="text-center mt-2">
            Already have an account?{' '}
            <Link to="/captain-login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CaptainRegister
