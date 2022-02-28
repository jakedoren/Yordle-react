import React, { useState } from 'react';
import './App.css';
import Wordle from './components/Wordle';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import { MyGlobalContext } from './userContext';

const App: React.FC = () => {
  const [isLoggedIn, setAuth] = useState<boolean>(false)

  return (
    <>
      <MyGlobalContext.Provider value={{isLoggedIn, setAuth}}>
        <h1>Hello {sessionStorage.getItem("username")}</h1>
        <Routes>
          <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/' element={<Wordle />} />
            </Route>
        </Routes>
      </MyGlobalContext.Provider>
  </>
  );
}

export default App;
