import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../userContext'

interface login {
    username: string,
    password: string
}

const Login = () => {
    const [formInfo, setFormInfo] = useState<login>({
        username: '',
        password: ''
    })
    // @ts-ignore
    const isLoggedIn = useContext<boolean>(UserContext)
    let navigate = useNavigate()

    const handleChange = (e: any) => {
        setFormInfo({
            ...formInfo, [e.target.name] : e.target.value
        })
    }

    function setCookie(name: string, value: string) {
        document.cookie = name + "=" + ("Bearer " + value || "") + "; path=/";
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(formInfo)
        axios.post("http://localhost:8080/user/authenticate", formInfo)
            .then(res => {
                console.log(res.data.jwt)
                setCookie("yordle-auth", res.data?.jwt)
                navigate('/')
            })
            .catch(res => {
                console.error(res)
            })
    }

  return (
    <form>
        <h1>{isLoggedIn}</h1>
        <p>hi</p>
        <input type="text" name='username' onChange={handleChange} />
        <input type="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>login</button>
    </form>
  )
}

export default Login