import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../helpers/helper'

const Logout = () => {
    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.preventDefault()
        sessionStorage.clear()
        deleteCookie("yordle-auth")
        navigate("/login")
    }

  return (
    <button onClick={handleClick}>Logout</button>
  )
}

export default Logout