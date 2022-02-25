import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../userContext'
import { setCookie } from '../helpers/helper'

interface login {
    username: string,
    password: string
}

const Login = () => {
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
        console.log(formInfo)
        axios.post("http://localhost:8080/user/authenticate", formInfo)
            .then(res => {
                setAuth(true)
                setCookie("yordle-auth", res.data?.jwt)
                navigate('/')
            })
            .catch(res => {
                console.error(res)
            })
    }

  return (
    <form>
        <h1>{isLoggedIn.toString()}</h1>
        <p onClick={() => setAuth(!isLoggedIn)}>swap</p>
        <input type="text" name='username' onChange={handleChange} />
        <input type="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>login</button>
    </form>
  )
}

export default Login