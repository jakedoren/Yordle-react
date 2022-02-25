import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Wordle from './components/Wordle';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import { useGlobalContext } from './userContext';
import { getCookie } from './helpers/helper';
import { MyGlobalContext } from './userContext';

const App: React.FC = () => {
  // const [isLoading, setIsloading] = useState<boolean>(true)
  const [copy, setCopy] = useState<string>('this is from context')

  // useEffect(() => {
  //     const authCookie = getCookie("yordle-auth")
  //     if(authCookie && !isLoggedIn) {
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

  // useEffect(() => {
  //   console.log(isAuth)
  //   console.log(isLoggedIn)
  // }, [isAuth])

  return (
    <>
      {/* {isLoading ? <p>...loading</p> : */}
        <MyGlobalContext.Provider value={{copy, setCopy}}>
          <Routes>
            <Route path='/login' element={<Login />} />
              <Route path='/' element={<ProtectedRoute />}>
                <Route path='/' element={<Wordle />} />
              </Route>
          </Routes>
        </MyGlobalContext.Provider>
      {/* } */}
    </>
  );
}

export default App;
