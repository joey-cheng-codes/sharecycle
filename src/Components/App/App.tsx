import React from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <p className='underline font-bold text-3xl'>Hello World from App</p>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup />}
            ></Route>
            <Route
              path='/dashboard'
              element={<Dashboard />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div >
  )
};

export default App;