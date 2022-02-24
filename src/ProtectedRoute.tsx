import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from './helpers/helper'
import { UserContext } from './userContext';

const ProtectedRoute = () => {
    // const [isLoading, setIsloading] = useState<boolean>(true)
    // const [isAuth, setIsAuth] = useState<boolean>(false)

    // useEffect(() => {
    //     const authCookie = getCookie("yordle-auth")
    //     if(authCookie) {
    //         axios.get('http://localhost:8080/user/isloggedin', {
    //             headers: {
    //                 "authorization": authCookie
    //             }
    //         })
    //         .then(res => {
    //             if(res.status == 200 && res.data == true) {
    //                 setIsAuth(true)
    //             }
    //         })
    //         .then(() => {
    //             setIsloading(false)
    //         })
    //         .catch(err => {
    //             setIsAuth(false)
    //             console.log(err)
    //         })
    //     } else {
    //         setIsloading(false)
    //         setIsAuth(false)
    //     }
    // }, [])

    const isLoggedIn = useContext(UserContext)

    useEffect(() => {
        console.log(isLoggedIn)
    }, [])

  return (
    <>
        {!isLoggedIn ? 
          <Navigate to="/login" /> : <Outlet />
        }
    </>
  ) 
}

export default ProtectedRoute
