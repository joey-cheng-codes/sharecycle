import React from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <p className='underline font-bold text-3xl'>Hello World from App</p>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button> */}
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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
};

export default App;