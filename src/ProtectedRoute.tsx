import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from './helpers/helper'
import { useGlobalContext } from './userContext';

const ProtectedRoute = () => {
  const {isLoggedIn, setAuth} = useGlobalContext()
  const [checkForCookie, setCheckForCookie] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const authCookie = getCookie("yordle-auth")
    if(!authCookie) {
      setCheckForCookie(false)
    } else if(!isLoggedIn) {
      axios.get('http://localhost:8080/user/isloggedin', {
        headers: {
          "authorization": authCookie
        }
      })
      .then(res => {
        if(res.status == 200 && res.data == true) {
          setAuth(true)
        }
      })
      .catch(err => {
        console.error(err)
        navigate('/login')
      })
    }
  }, [])

  return (
    <>
      {isLoggedIn ? <Outlet /> : checkForCookie ? <p>loading</p> : <Navigate to="/login" />}
    </>
  ) 
}

export default ProtectedRoute
