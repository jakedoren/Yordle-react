import React, { useState } from 'react';
import './App.css';
import Wordle from './components/Wordle';
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import { MyGlobalContext } from './userContext';
import DailyAttempt from './components/DailyAttempt';
import Logout from './components/Logout';

const App: React.FC = () => {
  const [isLoggedIn, setAuth] = useState<boolean>(false)

  return (
    <>
      <MyGlobalContext.Provider value={{isLoggedIn, setAuth}}>
        <h1>Hello {sessionStorage.getItem("username")}</h1>
        <Logout />
        <Routes>
          <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='/' element={<DailyAttempt />} />
            </Route>
        </Routes>
      </MyGlobalContext.Provider>
  </>
  );
}

export default App;
