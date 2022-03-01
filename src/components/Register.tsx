import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../userContext'
import { setCookie } from '../helpers/helper'

interface login {
    username: string,
    password: string
}

const Register = () => {
    const [formInfo, setFormInfo] = useState<login>({
        username: '',
        password: ''
    })
    const {isLoggedIn, setAuth} = useGlobalContext()
    let navigate = useNavigate()

    const handleChange = (e: any) => {
        setFormInfo({
            ...formInfo, [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_USERSVC}/user/create`, formInfo)
            .then(res => {
                setAuth(true)
                setCookie("yordle-auth", res.data?.jwt)
                sessionStorage.setItem("username", res.data?.username)
                navigate('/')
            })
            .catch(err => console.error(err))
    }

  return (
    <form>
        <h1>Register</h1>
        <input type="text" name='username' onChange={handleChange} />
        <input type="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>login</button>
    </form>
  )
}

export default Register